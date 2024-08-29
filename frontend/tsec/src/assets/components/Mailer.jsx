import React, { useState } from 'react';
import Papa from 'papaparse';
import './EmailForm.css'; // Import the CSS file

async function sendEmail(toEmail, name, subject, htmlContent, attachment) {
    const formData = new FormData();
    formData.append('to', toEmail);
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('html', htmlContent); // Assuming the server expects 'html' for HTML content
    formData.append('attachment', attachment);

    const response = await fetch(`http://localhost:3000/sendEmailWithAttachment`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }
}

const EmailForm = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!csvFile || !subject || !htmlContent || !attachment) {
            alert('Please fill in all fields and upload a file');
            return;
        }

        try {
            Papa.parse(csvFile, {
                header: true,
                complete: async (results) => {
                    for (const row of results.data) {
                        try {
                            console.log('Sending email to:', row.email);
                            await sendEmail(row.email, row.name, subject, htmlContent, attachment);
                        } catch (error) {
                            console.error(`Failed to send email to ${row.email}:`, error);
                        }
                    }
                    alert('Emails sent successfully');
                    setIsModalOpen(false); // Close the modal after sending emails
                }
            });
        } catch (error) {
            alert('Failed to send emails');
        }
    };

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    return (
        <div>
            <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
                Send Certificates
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <form onSubmit={handleSubmit} className="email-form">
                            <div>
                                <label>Subject:</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>HTML Content:</label>
                                <textarea
                                    value={htmlContent}
                                    onChange={(e) => setHtmlContent(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>CSV File:</label>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Attachment:</label>
                                <input
                                    type="file"
                                    onChange={handleAttachmentChange}
                                    required
                                />
                            </div>
                            <div className="drop-down-events">
                                <label>Event:</label>
                                <select>
                                    <option value="event1">Abhudaya</option>
                                    <option value="event2">Juhu Beach Clean Up</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Send Emails</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailForm;
