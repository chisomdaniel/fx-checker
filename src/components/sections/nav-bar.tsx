import Logo from "@/assets/images/logo.svg?react";

interface NavBarProp {
  loading: boolean;
  noOfCurrencies: number;
  isError: boolean;
}

export default function NavBar({ loading, noOfCurrencies }: NavBarProp) {
  return (
    <nav className="flex items-center justify-between p-4 text-neutral-200 md:px-6 md:py-5">
      <Logo className="h-5 w-auto md:h-6.5" />
      <div>
        {loading ? (
          <p className="tp-6 md:tp-4">loading...</p>
        ) : (
          <p className="tp-6 md:tp-4">
            {noOfCurrencies} CURRENCIES · EOD · ECB DATA
          </p>
        )}
      </div>
    </nav>
  );
}
