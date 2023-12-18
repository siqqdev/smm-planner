import { AppProps } from "next/app";
import "@/app/globals.css";
import { ThemeProvider } from "@/tailwindWrapper";
import { NavbarSimple } from "@/components/navbar";
import { Provider } from "react-redux";
import store, { RootState } from "@/store";
import RootLayout from "@/app/layout";
import { animated, useSpring } from "react-spring";
import { useAppSelector } from "@/hooks";
import AddPost from "./addPost";
import AddIdea from "./addIdea";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {

  const isAddPostOpened = useAppSelector((state: RootState) => state.addPost.isAddPostOpened) 
  const isAddIdeaOpened = useAppSelector((state: RootState) => state.addIdea.isAddIdeaOpened)

  const addPostOpenedAnimation = useSpring({
    opacity: isAddPostOpened ? 1 : 0,
  });
  
  const addIdeaOpenedAnimation = useSpring({
    opacity: isAddIdeaOpened ? 1 : 0,
  });

  const router = useRouter();

  return (
        <RootLayout>
            <ThemeProvider>
              <div>
                 <NavbarSimple /> 
              </div> 
                <div>
                
                </div>
                  <div>
                  {
                    isAddPostOpened ?
                      <animated.div style={addPostOpenedAnimation}>
                        <AddPost />
                      </animated.div>
                        : null
                  }
                  </div>
                    <div>
                      {
                        isAddIdeaOpened ? 
                        <animated.div style={addIdeaOpenedAnimation}>
                          <AddIdea ideasArray={[]} />
                        </animated.div>
                        : null
                      }
                    </div>
               <Component {...pageProps} />
            </ThemeProvider>
        </RootLayout>
  );
}

const MyAppWrapper = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Provider store={store}>
      <div>
        <MyApp Component={Component} pageProps={pageProps} router={router} />
      </div>
    </Provider>
  );
}

export default MyAppWrapper;
