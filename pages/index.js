import Head from "next/head";
//components
import Loginvalidation from "./login/LoginValidation";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Supplier/Buyer App - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex bg-gray-bg1">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-5">
          <h1 className="text-2xl font-medium text-primary text-center pb-6 px-7">
            Login to Admin Account 🔐
          </h1>
          <Loginvalidation />
        </div>
      </div>
    </div>
  );
}