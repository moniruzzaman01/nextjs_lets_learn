import SignUp from "../_components/SignUp";

export default async function Register({ params }) {
  const { role } = await params;

  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignUp role={role} />
      </div>
    </div>
  );
}
