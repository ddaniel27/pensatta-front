import removeCursor from '/images/exercises/27/remove.svg';

const getCursor = ({ type }) => {
  switch (type) {
    case 'eraser': {
      return removeCursor;
    }

    default: {
      return '';
    }
  }
};

export default getCursor;