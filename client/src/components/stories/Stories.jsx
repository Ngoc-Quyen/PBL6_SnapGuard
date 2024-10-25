import { useContext } from 'react';
import './stories.scss';
import { useAuth } from '../../hooks/useAuth';

const Stories = () => {
    const { currentUser } = useAuth();

    //TEMPORARY
    const stories = [
        {
            id: 1,
            name: 'Thảo Thảo',
            img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        },
        {
            id: 2,
            name: 'Thảo Thảo',
            img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        },
        {
            id: 3,
            name: 'Thảo Thảo',
            img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        },
        {
            id: 4,
            name: 'Thảo Thảo',
            img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        },
    ];

    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.avatar_url} alt="" />
                <span>{currentUser.full_name}</span>
                <button>+</button>
            </div>
            {stories.map((story) => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
