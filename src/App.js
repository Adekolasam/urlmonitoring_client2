import Header from "./components/LayoutComponents/Header";
import SideNavBar from "./components/LayoutComponents/SideNav";
import Router from "./Router";

function App() {
  return (
    <>
        <Header />
        <div className="container-fluid">
            <div className="row">
                <SideNavBar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <Router />
                    <div className="container-fluid" style={{marginTop: "2%"}}>
                        <div className="row">
                            &copy; 2022 - URLMonitoring - <a href="#">Privacy</a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </>
    
  );
}

export default App;
