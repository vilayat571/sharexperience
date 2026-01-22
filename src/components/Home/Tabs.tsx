import { useState } from "react";
import { tabs, techStacksByRole } from "../../data/tabs";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");

  return (
    <>
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 cursor-pointer py-4 px-2 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.name
                    ? "border-black text-black font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-8 mt-12">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      <p>Interview experiences for {activeTab} will appear here</p>

          </h2>
          <div className="flex flex-wrap gap-2">
            {techStacksByRole[activeTab]?.map((tech) => (
              <button
                key={tech}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-black hover:bg-gray-50 transition"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
