import AuthForm from "@/components/auth/AuthForm";
import Header from "../components/common/Header";
import LogoutButton from '@/components/auth/LogoutButton';
export default function HomePage() {
  return (
    <>
      <Header />
      <AuthForm />
      <LogoutButton />
      {/* <FeaturedBooks />
      <Filter />
      <BookList /> */}
    </>
  );
}
