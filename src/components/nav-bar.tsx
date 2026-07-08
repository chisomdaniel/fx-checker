import Logo from "../assets/images/logo.svg?react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 text-neutral-200 md:px-6 md:py-5">
      <Logo className="h-5 w-auto md:h-6.5" />
      <div>
        <p className="tp-6 md:tp-4">55 CURRENCIES · EOD · ECB DATA</p>
      </div>
    </nav>
  );
}
