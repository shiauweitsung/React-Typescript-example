import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  googleLogout,
} from '@react-oauth/google';
import Button from 'components/Button';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

type IUser = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

export default function GoogleLoginPage() {
  const [user, setUser] = useState<IUser>();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, 'tokenResponse');
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      setUser(userInfo);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div>
      <h3>GOOGLE Login</h3>
      <Button
        onClick={() => {
          googleLogin();
        }}
      >
        login
      </Button>
      <Button
        onClick={() => {
          googleLogout();
        }}
      >
        GoogleLogOut
      </Button>
      {/* <GoogleLogin
        type="icon"
        theme="filled_blue"
        shape="circle"
        auto_select
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse, 'success');
          if (credentialResponse.credential) {
            const userInfo = jwtDecode(credentialResponse.credential) as IUser;
            console.log(userInfo);
            if (userInfo) {
              setUser(userInfo);
            }
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      {user ? (
        <>
          <h2>Name: {user.name}</h2>
          <p>email: {user.email}</p>
        </>
      ) : (
        'no login'
      )}
    </div>
  );
}
