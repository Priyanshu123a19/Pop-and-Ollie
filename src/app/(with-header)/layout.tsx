import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

type props ={
    children: React.ReactNode;
}

export default function Layout({
    children
}: props){
        return (
            <>
                <Header />
                {children}
                <Footer />
            </>
        )
    }