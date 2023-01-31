import { useCookies, withCookies, Cookies } from 'react-cookie';

export default function CookiePage() {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  function onChange(newName: string) {
    setCookie('name', newName, { path: '/', maxAge: 3600 });
  }
  function MyComponent() {
    return null;
  }
  const NewComponent: any = withCookies(MyComponent);
  console.log('NewComponent:', NewComponent);
  console.log('cookies:', Cookies);

  NewComponent.WrappedComponent === MyComponent;
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onChange('jack');
        }}
      >
        change cookie
      </button>
      <button
        onClick={() => {
          removeCookie('name');
        }}
      >
        remove cookie
      </button>
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}
