import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import Share from '../../components/share/Share';
import './home.scss';
import RightBar from '../../components/rightBar/RightBar';
import { useState } from 'react';

const Home = () => {

    const [refreshPosts, setRefreshPosts] = useState(false);

    const handlePostCreated = () => {
        setRefreshPosts(!refreshPosts);
    };

    return (
        <div className="home">
            <div className="left">
                <Stories />
                <Share onPostCreated={handlePostCreated} />
                <Posts linkAPI={`feed`} />
            </div>
            <div className="right">
                <RightBar linkAPI={'friend/requests/incoming'} />
            </div>
        </div>
    );
};

export default Home;
