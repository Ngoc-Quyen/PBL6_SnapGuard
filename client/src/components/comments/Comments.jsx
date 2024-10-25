import { useContext, useRef, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import useNode from '../../hooks/useNode';

const Comments = () => {
    const { currentUser } = useContext(AuthContext);
    //Temporary
    const comments = [
        {
            id: 1,
            desc: 'hihi',
            name: 'Ngân ngân',
            userId: 1,
            profilePicture:
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            id: 2,
            desc: 'hehe',
            name: 'Quyên quyên',
            userId: 2,
            profilePicture:
                'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
            commentImg:
                'https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-6/465472153_1122467853214999_6493259625208381744_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGURjuxvaY1YJnUSrF618RVQvcRCIzvvIZC9xEIjO-8hrk6sqX1GAp7INpTLT-EEFqrCNixXj5UDylOud0fTOuP&_nc_ohc=Xm5reT8pAYYQ7kNvgFvv-bv&_nc_zt=23&_nc_ht=scontent.fdad3-3.fna&_nc_gid=AdBmwfeE0-T2ldLxobOd8-o&oh=00_AYBk1kA35I4XntX-fuR1xNQL40_w6URx6KPLeaFmDfJtzw&oe=672EAF37',
        },
    ];

    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
            textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Cập nhật chiều cao tối đa là 300px
        }
    };
    const handleIconClick = () => {
        // Kích hoạt input file khi bấm vào icon
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Lưu ảnh vào state
            setPreviewImage(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
        }
    };
    const handleSendComment = () => {
        if (comment.trim() || image) {
            console.log('Nội dung bình luận:', comment);
            if (image) {
                console.log('Ảnh đính kèm:', image);
            }
            // Thực hiện gửi nội dung bình luận và ảnh lên server tại đây

            // Xóa nội dung ô nhập và ảnh sau khi gửi
            setComment('');
            setImage(null);
            setPreviewImage(null);
            fileInputRef.current.value = null; // Xóa giá trị file input
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };
    // Khởi tạo một đối tượng để lưu trạng thái liked theo id của comment
    const [likedComments, setLikedComments] = useState({});

    const handleClickLiked = (id) => {
        setLikedComments((prevLikedComments) => ({
            ...prevLikedComments,
            [id]: !prevLikedComments[id], // Đổi trạng thái like của comment có id tương ứng
        }));
    };

    const [isImageOpen, setIsImageOpen] = useState(false);

    // Hàm xử lý mở/đóng ảnh
    const handleImageClick = () => {
        setIsImageOpen(!isImageOpen);
    };
    return (
        <div className="comments">
            <div className="write">
                <div className="write-img">
                    <img src={currentUser.avatar_url} alt="" />
                </div>
                <div className="write-content">
                    <div className="write-input">
                        {/* <input type="text" placeholder={`Bình luận dưới tên là ${currentUser.full_name}`} /> */}
                        <textarea
                            ref={textareaRef}
                            placeholder={`Bình luận dưới tên là ${currentUser.full_name}`}
                            className="input-textarea"
                            onInput={handleInput}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="btn-icon">
                            <div className="btn-img">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {/* Icon máy ảnh */}
                                {!previewImage && (
                                    <i
                                        className="fas fa-camera"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleIconClick}
                                    ></i>
                                )}
                            </div>
                            <i
                                className="fas fa-paper-plane"
                                style={{ cursor: 'pointer' }}
                                onClick={handleSendComment}
                            ></i>
                        </div>
                    </div>
                    {previewImage && (
                        <div className="image-preview">
                            <img src={previewImage} alt="Ảnh đã chọn" />
                            <i
                                class="fas fa-times-circle"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    setPreviewImage(null);
                                }}
                            ></i>
                        </div>
                    )}
                </div>
            </div>
            {comments.map((comment) => (
                <div className="comment">
                    <div className="comment-content">
                        <img src={comment.profilePicture} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                            {comment.commentImg && (
                                <div className="comment-img">
                                    <img src={comment.commentImg} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="btn-icon">
                        <span className="date">1 giờ</span>
                        <div className="item" onClick={() => handleClickLiked(comment.id)}>
                            {likedComments[comment.id] ? (
                                <i className="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                            ) : (
                                <i className="far fa-heart font-size-18"></i>
                            )}
                        </div>
                        <div className="btn-comment">
                            <i class="fas fa-comment-dots"></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
