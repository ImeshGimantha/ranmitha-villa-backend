import mailService from "../services/mail.service.js";

const MailController = {
    bookingMail: async (req, res, next) => {
        try {
            const mail = await mailService.booking(req.body);
            res.json({
                success: true,
                message: "Email send successfully",
                mail
            });
        } catch (error) {
            next(error);
        }
    },
    cancelMail: async (req, res, next) => {}
};

export default MailController;