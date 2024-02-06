export default function authHeader(): { [key: string]: string } {
    const userStr = localStorage.getItem("user");
    let user: { accessToken?: string | null } | null = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.accessToken != null) {
    //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
    //   return { Authorization: '' }; // for Spring Boot back-end
      return { 'x-access-token': '' }; // for Node Express back-end
    }
  }
