import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'My comment',
            screenshot: 'data:image/png;base64:image.png'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: '',
            comment: 'My comment',
            screenshot: 'data:image/png;base64:image.png'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64:image.png'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {

        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'Bugadão!',
            screenshot: 'image/png;base64:image.png'
        })).rejects.toThrow();
    });
})