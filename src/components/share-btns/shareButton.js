import React from 'react';
import { FacebookShareButton, FacebookIcon,TwitterShareButton , TwitterIcon , EmailIcon , EmailShareButton , TelegramShareButton , TelegramIcon} from 'react-share';

const ShareButtons = ({ url, title }) => {
  return (
    <div className='d-flex flex-column flex-lg-row flex-md-row justify-content-between align-items-center gap-4 w-100'>
      <FacebookShareButton url={url} quote={title} >
        <FacebookIcon style={{
          borderRadius : "50%",
          height : "50px",
          width:"50px"
        }}/>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
      <TwitterIcon style={{
          borderRadius : "50%",
          height : "50px",
          width:"50px"
        }}/>
      </TwitterShareButton>
      <EmailShareButton url={url} title={title}>
      <EmailIcon style={{
          borderRadius : "50%",
          height : "50px",
          width:"50px"
        }}/>
      </EmailShareButton>
      <TelegramShareButton url={url} title={title}>
      <TelegramIcon style={{
          borderRadius : "50%",
          height : "50px",
          width:"50px"
        }}/>
      </TelegramShareButton>
    </div>
  );
};

export default ShareButtons;