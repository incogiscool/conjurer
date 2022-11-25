import Link from "next/link";
import MainContainer from "../components/MainContainer";

export default function Home() {
  return (
    <div>
      <MainContainer title="Conjurer" className="min-h-screen">
        <div className="text-center">
          <Link href="/barricade">
            <button>Enter Barricade</button>
          </Link>
        </div>
      </MainContainer>
    </div>
  );
}
