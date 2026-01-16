import nodemailer from 'nodemailer';

const confirmLetter = (reservation, room, user) =>  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Booking Confirmed - Ranmitha Villa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:20px 0;">

                    <!-- MAIN CONTAINER -->
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                        <!-- HEADER -->
                        <tr>
                            <td style="background:#2f855a; padding:20px; text-align:center; color:#ffffff;">
                                <h1 style="margin:0; font-size:24px;">✔ Booking Confirmed</h1>
                                <p style="margin:5px 0 0;">Ranmitha Villa</p>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td style="padding:25px; color:#333333;">

                                <p style="font-size:16px;">Hello <strong>${user['firstname']}</strong>,</p>

                                <p>
                                    Your booking at <strong>Ranmitha Villa</strong> has been successfully confirmed.
                                    We’re excited to welcome you 🌴
                                </p>

                                <!-- BOOKING DETAILS -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">📌 Booking Details</h3>
                                <table width="100%" cellpadding="5">
                                    <tr>
                                        <td><strong>Booking ID:</strong></td>
                                        <td>${reservation['booking_id']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td style="color:#2f855a;"><strong>Confirmed</strong></td>
                                    </tr>
                                </table>

                                <!-- STAY DETAILS -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">🏡 Stay Details</h3>
                                <table width="100%" cellpadding="5">
                                    <tr>
                                        <td><strong>Room:</strong></td>
                                        <td>${room['type']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Guests:</strong></td>
                                        <td>${reservation['guests']}</td>
                                    </tr>
                                </table>

                                <!-- DATE DETAILS -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">📅 Date Details</h3>
                                <table width="100%" cellpadding="5">
                                    <tr>
                                        <td><strong>Check-in:</strong></td>
                                        <td>${new Date(reservation['check_in_date'])}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Check-out:</strong></td>
                                        <td>${new Date(reservation['check_out_date'])}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nights:</strong></td>
                                        <td>${reservation['nights']}</td>
                                    </tr>
                                </table>

                                <!-- PAYMENT -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">💰 Payment Summary</h3>
                                <table width="100%" cellpadding="5">
                                    <tr>
                                        <td><strong>Price per Night:</strong></td>
                                        <td>${room['pricePerNight']} LKR</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Amount:</strong></td>
                                        <td><strong>${reservation['nights'] * room['pricePerNight']} LKR</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Payment Method:</strong></td>
                                        <td>{{paymentMethod}}</td>
                                    </tr>
                                </table>

                                <!-- INFO -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">⏰ Check-in Information</h3>
                                <p>
                                    Check-in: After 2:00 PM<br />
                                    Check-out: Before 11:00 AM
                                </p>

                                <!-- CONTACT -->
                                <h3 style="border-bottom:1px solid #ddd; padding-bottom:5px;">📞 Contact</h3>
                                <p>
                                    Phone: +94 XX XXX XXXX<br />
                                    Email: ranmithavilla@gmail.com
                                </p>

                                <!-- FOOTER MESSAGE -->
                                <p style="margin-top:25px;">
                                    If you have any questions or special requests, just reply to this email.
                                    We can’t wait to host you 😌
                                </p>

                                <p style="margin-top:20px;">
                                    Warm regards,<br />
                                    <strong>Ranmitha Villa Team</strong>
                                </p>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#777;">
                            © Ranmitha Villa · Sri Lanka
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
`;

class MailRepository {
    async booking(reservation, room, user) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: `"Ranmitha Villa" <${process.env.GMAIL}>`,
            to: `${process.env.GMAIL}`,
            subject: "Booking Confirmed - You Stay at Ranmitha Villa",
            html: confirmLetter(reservation, room, user),
        });

        return info;
    }
}

export default new MailRepository;