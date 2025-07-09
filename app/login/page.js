import SignIn from "./_components/SignIn";
import Social from "./_components/Social";

export default function Login() {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignIn />
        <Social />
      </div>
    </div>
  );
}
