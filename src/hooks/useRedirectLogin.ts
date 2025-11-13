import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";

export function useRedirectLoginUser(){
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            router.push("/habitos");
          }
    
          setTimeout(() => {
            setLoading(false);
          }, 800);
        });
    
        return () => unsubscribe();
      }, [router]);

    return{loading}
}