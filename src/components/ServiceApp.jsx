"use client"

import React, { useState, useEffect } from "react";
import { CheckCircleIcon, CircleStop } from "lucide-react"; 
import Switch from "./Switch";
import Wrapper from "./Wrapper";

const ServiceApp = () => {
  const [apacheRunning, setApacheRunning] = useState(false);
  const [mysqlRunning, setMysqlRunning] = useState(false);
  const [status, setStatus] = useState("");

  const handleServiceStatus = (event, message) => {
    setStatus(message);
  };

  // Handle service status updates from Electron
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on("service-status", handleServiceStatus);
    }
    return () => {
      if (window.electron) {
        window.electron.ipcRenderer.removeListener("service-status", handleServiceStatus); // Remove the specific listener
      }
    };
  }, []);

  // Control service function
  const controlService = (service, action) => {
    console.log("clicked")
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send("control-service", service, action);
      setStatus(`${action.charAt(0).toUpperCase() + action.slice(1)}ing ${service.charAt(0).toUpperCase() + service.slice(1)}...`);
    } else {
      console.error("Electron API is not available");
    }
  };

  return (
    <Wrapper title={"Apache & MySQL Server Control"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Apache Control */}
        <div className="flex flex-col items-center p-4 bg-neutral-800 rounded-lg shadow-lg transition-all">
          <h2 className="text-xl font-medium text-neutral-100 mb-4">Apache</h2>
          <Switch
            type={"apache"}
            checked={apacheRunning}
            onChange={(e) => {
              const checked = e.target.checked;
              console.log("clicked")
              setApacheRunning(checked);
              controlService("apache2", checked ? "start" : "stop");
            }}
          />
          <p className={`mt-4 flex items-center ${apacheRunning ? "text-green-500" : "text-red-500"}`}>
            {apacheRunning ? (
              <>
                <CheckCircleIcon className="w-5 h-5 mr-2" /> Running
              </>
            ) : (
              <>
                <CircleStop className="w-5 h-5 mr-2" /> Stopped
              </>
            )}
          </p>
        </div>

        {/* MySQL Control */}
        <div className="flex flex-col items-center p-4 bg-neutral-800 rounded-lg shadow-lg transition-all">
          <h2 className="text-xl font-medium text-neutral-100 mb-4">MySQL</h2>
          <Switch
            type={"mysql"}
            checked={mysqlRunning}
            onChange={(e) => {
              const checked = e.target.checked;
              setMysqlRunning(checked);
              controlService("mysql", checked ? "start" : "stop");
            }}
          />
          <p className={`mt-4 flex items-center ${mysqlRunning ? "text-green-500" : "text-red-500"}`}>
            {mysqlRunning ? (
              <>
                <CheckCircleIcon className="w-5 h-5 mr-2" /> Running
              </>
            ) : (
              <>
                <CircleStop className="w-5 h-5 mr-2" /> Stopped
              </>
            )}
          </p>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-6 p-3 rounded-lg bg-neutral-900 shadow-md text-neutral-300">
        <p>{status}</p>
      </div>
    </Wrapper>
  );
};

export default ServiceApp;
