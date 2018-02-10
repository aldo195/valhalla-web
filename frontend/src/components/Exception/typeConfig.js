import unauthorizedAccessError from '../../assets/unauthorized_access_error.svg';
import notFoundError from '../../assets/not_found_error.svg';
import internalServerError from '../../assets/internal_server_error.svg';

const config = {
  403: {
    img: unauthorizedAccessError,
    title: '403',
    desc: 'Unauthorized Access',
  },
  404: {
    img: notFoundError,
    title: '404',
    desc: 'Page Not Found',
  },
  500: {
    img: internalServerError,
    title: '500',
    desc: 'Internal Server Error',
  },
};

export default config;
