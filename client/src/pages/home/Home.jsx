import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import Share from '../../components/share/Share';
import './home.scss';
import RightBar from '../../components/rightBar/RightBar';

const Home = () => {
    return (
        <div className="home">
            <div className="left">
                <Stories />
                <Share />
                <Posts linkAPI={`feed`} />
            </div>
            <div className="right">
                <RightBar />
            </div>
        </div>
    );
};

export default Home;
