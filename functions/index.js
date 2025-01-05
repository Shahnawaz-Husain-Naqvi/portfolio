const nodemailer = require('nodemailer');

// Create a Nodemailer transporter for sending emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahnawazhusain556@gmail.com', // Replace with your email
        pass: 'jjjw gsrz gflp bxrk'  // Replace with your Gmail app password or use OAuth
    }
});

// The handler function that Netlify will call
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            // Ensure the body is parsed as JSON
            const data = JSON.parse(event.body); 

            const userMail = data.email;

            // Define email options for the user
            let mailOptionsUser = {
                from: '"Shahnawaz" <shahnawazhusain556@gmail.com>',
                to: userMail,
                subject: 'Thank you for your Mentorship request!',
                text: `Thank you for trusting us for mentorship. Our team will reach out to you soon. For any queries, feel free to contact at husainshahnawaz15@gmail.com.`
            };

            // Define email options for the host
            let mailOptionsHost = {
                from: '"Shahnawaz" <shahnawazhusain556@gmail.com>',
                to: 'husainshahnawaz15@gmail.com',
                subject: 'New Mentorship Request',
                text: `
                    A new mentorship request has been made:
                    Name: ${data.name},
                    Service: ${data.service},
                    UPI Ref ID: ${data.upirefno},
                    User Email: ${data.email}
                `
            };

            // Send email to the user and host
            await transporter.sendMail(mailOptionsUser);
            await transporter.sendMail(mailOptionsHost);

            // After successful form submission, return a response
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Emails sent successfully' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send emails', details: error.message })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
