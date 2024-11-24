import { MessageSquare } from "lucide-react";
import "./NoChatSelected.scss";

const NoChatSelected = () => {
    return (
        <div className="no-chat-container">
            <div className="no-chat-content">
                <div className="icon-wrapper">
                    <div className="icon-bounce">
                        <MessageSquare className="icon" />
                    </div>
                </div>
                <h2 className="welcome-title">Chào mừng đến với SnapChat!</h2>
                <p className="welcome-text">
                    Chọn một cuộc trò chuyện từ thanh bên để bắt đầu trò chuyện
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
