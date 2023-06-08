import React, { Fragment } from "react";
import { Icon } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ConstantList from "../../app/appConfig";

const Breadcrumb = ({ routeSegments }) => {
  return (
    <div className="flex flex-middle position-relative">
      {routeSegments
        ? routeSegments.map((route, index) => (
            <Fragment key={index}>
              {index === 0 ? "" : <Icon className="text-hint">navigate_next</Icon>}
              
              {/* {index !== routeSegments.length - 1 ? ( */}
              {route.path ? (
                <NavLink to={ConstantList.ROOT_PATH + route.path}>
                  <span className="capitalize text-muted">{route.name}</span>
                </NavLink>
              ) : (
                <span className="capitalize text-muted">{route.name}</span>
              )}
            </Fragment>
          ))
        : null}
    </div>
  );
};

export default Breadcrumb;
