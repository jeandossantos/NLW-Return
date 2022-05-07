import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "./ScreenShotButton";

interface FeedBackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequest: () => void;
    onFeedbackSent: () => void
}

export function FeedBackContentStep({
    feedbackType,
    onFeedbackRestartRequest,
    onFeedbackSent
}: FeedBackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedBack(e: FormEvent) {
        e.preventDefault();
        console.log({ comment, screenshot })
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button type="button"
                    onClick={onFeedbackRestartRequest}
                    className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img className="w-6 h-6"
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form className="py-4 w-full" onSubmit={handleSubmitFeedBack}>
                <textarea placeholder="Conte com detalhes o que está acontencendo..."
                    onChange={e => setComment(e.target.value)}
                    className="min-w-[384px] w-full min-h-[112px] text-sm placeholder-zinc-400
                     text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500
                     focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none
                     scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"/>
                <footer className="flex gap-2 w-full">

                    <ScreenShotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot} />
                    <button type="submit" disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent text-sm
                        flex-1 flex justify-center justify-center items-center hover:bg-brand-300
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
                         focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                        Envie seu feedback
                    </button>
                </footer>
            </form>
        </>
    )
}