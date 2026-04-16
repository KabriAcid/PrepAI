import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/button';

type QuizActionModalsProps = {
    showConfirmModal: boolean;
    showQuitModal: boolean;
    onCloseConfirm: () => void;
    onCloseQuit: () => void;
    onSubmit: () => void;
    onQuit: () => void;
};

export default function QuizActionModals({
    showConfirmModal,
    showQuitModal,
    onCloseConfirm,
    onCloseQuit,
    onSubmit,
    onQuit,
}: QuizActionModalsProps) {
    return (
        <>
            <Modal isOpen={showConfirmModal} onClose={onCloseConfirm} title="Submit Quiz">
                <div className="space-y-4">
                    <p className="text-spiritual-600">
                        Are you sure you want to submit your quiz? You will not be able to
                        change your answers after submission.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button variant="secondary" onClick={onCloseConfirm} className="flex-1">
                            Continue Exam
                        </Button>
                        <Button variant="primary" onClick={onSubmit} className="flex-1">
                            Submit and View Summary
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showQuitModal} onClose={onCloseQuit} title="Quit Exam">
                <div className="space-y-4">
                    <p className="text-spiritual-600">
                        You are about to leave this exam session. Any unanswered questions will remain unanswered.
                        Do you want to quit?
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button variant="secondary" onClick={onCloseQuit} className="flex-1">
                            Stay in Exam
                        </Button>
                        <Button variant="danger" onClick={onQuit} className="flex-1">
                            Yes, Quit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
