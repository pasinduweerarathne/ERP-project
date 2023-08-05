import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { ArrowLongLeftIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content text-accent text-center">
        <div className="max-w-md">
          <FaceFrownIcon className="h-48 w-48 inline-block" />
          <h1 className="text-5xl font-bold">404 - Not Found</h1>
          <NavLink
            to="/app/dashboard"
            className="bg-transparent hover:bg-[#37CDBE] border-[#37CDBE] hover:border-[#37CDBE] text-[#37CDBE] hover:text-white btn mt-5"
          >
            <ArrowLongLeftIcon className="h-5 w-5 inline-block" />
            <b className="pl-2">Go to dashboard</b>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
