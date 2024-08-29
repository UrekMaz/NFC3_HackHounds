async function generateCertificates() {
    // Step 1: Get the user inputs
    const alignX = document.getElementById('alignX').value;
    const alignY = document.getElementById('alignY').value;
    const manualX = parseFloat(document.getElementById('manualXInput').value);
    const manualY = parseFloat(document.getElementById('manualYInput').value);
    const fontSize = parseFloat(document.getElementById('fontSize').value);
    const fontType = document.getElementById('fontType').value;
    const subject = document.getElementById('mailSubject').value;
    const text = quill.root.innerHTML;
    const emailUser = document.getElementById('emailUser').value;
    const passApp = document.getElementById('passApp').value;


    // Step 2: Get the uploaded PDF template file
    const templateInput = document.getElementById('templateInput');
    const templateFile = templateInput.files[0];
    if (!templateFile) {
        alert('Please select a PDF template file');
        return;
    }

    // Step 3: Get the uploaded CSV file
    const csvInput = document.getElementById('csvInput');
    const csvFile = csvInput.files[0];
    if (!csvFile) {
        alert('Please select a CSV file');
        return;
    }

    if (!subject) {
        alert('Please enter a subject for the email');
        return;
    }
    // Step 4: Read the CSV file
    const reader = new FileReader();
    reader.onload = function (event) {
        const csvData = event.target.result;
        Papa.parse(csvData, {
            header: true,
            complete: async function (results) {
                const names = results.data.map(row => row[0]);
                // Initialize progress
                const totalEmails = results.data.length;
                let emailsSent = 0;
                document.getElementById('loadingBarContainer').style.display = 'block';
                updateProgress(emailsSent, totalEmails);
                for (const row of results.data) {
                    const name = row.Name;
                    const email = row.Email;
                    if (name && email) {
                        await generateCertificate(name, email, subject, text, emailUser, passApp, templateFile, alignX, alignY, manualX, manualY, fontSize, fontType);
                    }
                    emailsSent++;
                    updateProgress(emailsSent, totalEmails);
                }
                // Finalize progress
                alert('All certificates have been generated and emails sent.');
            }
        });
    };
    reader.readAsText(csvFile);
}

async function generateCertificate(name, email, subject, text, emailUser, passApp, templateFile, alignX, alignY, manualX, manualY, fontSize, fontType) {
    const reader = new FileReader();
    reader.onload = async function (event) {
        const existingPdfBytes = new Uint8Array(event.target.result);
        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Step 1: Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width: pageWidth, height: pageHeight } = firstPage.getSize();

        // Step 2: Embed the selected font
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts[fontType]);

        // Step 3: Calculate text width and height
        const nameWidth = font.widthOfTextAtSize(name, fontSize);
        const nameHeight = fontSize;

        // Step 4: Calculate X coordinate
        let x;
        if (alignX === 'manual') {
            x = manualX;
        } else if (alignX === 'left') {
            x = 50; // Adjust as needed for left alignment
        } else if (alignX === 'center') {
            x = (pageWidth - nameWidth) / 2;
        } else if (alignX === 'right') {
            x = pageWidth - nameWidth - 50; // Adjust as needed for right alignment
        }

        // Step 5: Calculate Y coordinate
        let y;
        if (alignY === 'manual') {
            y = manualY;
        } else if (alignY === 'top') {
            y = pageHeight - nameHeight - 50; // Adjust as needed for top alignment
        } else if (alignY === 'middle') {
            y = (pageHeight - nameHeight) / 2;
        } else if (alignY === 'bottom') {
            y = 50; // Adjust as needed for bottom alignment
        }

        // Step 6: Draw the name on the first page
        firstPage.drawText(name, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
        });

        // Step 7: Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Step 8: Create a blob from the pdfBytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Send mail with attachment
        // Assuming this code is inside an async function
        await sendEmailWithAttachment(email, await formatText(subject, name), await formatText(text, name), blob, emailUser, passApp);

        // Step 9: Create a link element
        const link = document.createElement('a');

        // Step 10: Set the download attribute with a filename
        link.href = URL.createObjectURL(blob);
        link.download = `${name}_certificate.pdf`;

        // Step 11: Append the link to the body
        document.body.appendChild(link);

        // Step 12: Programmatically click the link to trigger the download
        link.click();

        // Step 13: Remove the link from the document
        document.body.removeChild(link);
    };

    reader.readAsArrayBuffer(templateFile);
}
async function formatText(htmlContent, name) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Replace placeholders within the HTML content
    let formattedHtml = htmlContent.replace(/{name}/g, name).replace(/{date}/g, currentDate);
    // Ensure any necessary HTML encoding is handled here if needed
    return formattedHtml;
}
async function sendEmailWithAttachment(toEmail, subject, htmlContent, attachment, emailUser, passApp) {
    const formData = new FormData();
    formData.append('to', toEmail);
    formData.append('subject', subject);
    formData.append('html', htmlContent); // Assuming the server expects 'html' for HTML content
    formData.append('attachment', attachment);
    formData.append('user', emailUser);
    formData.append('pass', passApp);
    // const response = await fetch(`https://certificate-generator-backend-alpha.vercel.app/sendEmailWithAttachment`, {
    //     method: 'POST',
    //     body: formData
    // });

    const response = await fetch(`http://localhost:3000/sendEmailWithAttachment`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }
}

function updateProgress(emailsSent, totalEmails) {
    const percentage = (emailsSent / totalEmails) * 100;
    // document.getElementById('loadingBar').style.width = `${percentage}%`;
    // document.getElementById('progressText').innerText = `${Math.round(percentage)}%`;
}
function toggleManualInput(selectId, inputId) {
    const select = document.getElementById(selectId);
    const input = document.getElementById(inputId);
    if (select.value === 'manual') {
        input.style.display = 'block';
    } else {
        input.style.display = 'none';
    }
}