import React from 'react';
import '../styles/styles.css';
import Image from 'next/image';
import aiImage from '../../public/images/ai-image.jpeg';
import visaIcon from '../../public/images/visaIcon.png';
import applicationIcon from '../../public/images/application-icon.png';
import requirementsIcon from '../../public/images/requirements-icon.png';
import otherIcon from '../../public/images/other-icon.png';

interface SidebarProps {
    onStartNewConversation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onStartNewConversation }) => {
    return (
        <div className="sidebar">
            <h1 className="bot-title">
                <Image
                    src={aiImage}
                    alt="Bot Icon"
                    className="bot-icon"
                    width={50} height={50}
                />
                Smart Bot
            </h1>
            <div className="new-conversation">
                <button onClick={onStartNewConversation}>+ New Conversation</button>
            </div>

            <div className="bot-description">
                <ul className="bot-bullet-points">
                    <li>
                        <Image src={visaIcon} alt="Visa Types" width={40} height={40} />
                        <span> Visa Types</span>
                    </li>
                    <li>
                        <Image src={applicationIcon} alt="Application Process" width={35} height={35} />
                        <span> Application Process</span>
                    </li>
                    <li>
                        <Image src={requirementsIcon} alt="Requirements" width={40} height={40} />
                        <span> Requirements</span>
                    </li>
                    <li>
                        <Image src={otherIcon} alt="Other Info" width={40} height={40} />
                        <span> Other Info</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
