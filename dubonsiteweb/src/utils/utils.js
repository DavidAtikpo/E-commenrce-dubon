export const getCookie = (authToken) => {
    const match = document.cookie.match(new RegExp('(^| )' + authToken + '=([^;]+)'));
    return match ? match[2] : null;
  };
  