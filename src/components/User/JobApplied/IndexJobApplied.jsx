import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginate from "../Paginate";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import id from "date-fns/locale/id";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoLocationSharp } from "react-icons/io5";
const IndexJobApplied = () => {
  const [jobApplied, setJobApplied] = useState([]);
  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    const fetchJobApplication = async () => {
      try {
        const jobApplicationResponse = await axios.get(
          "http://localhost:5000/api/user/jobapplied"
        );
        setJobApplied(jobApplicationResponse.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobApplication();
  });
  return (
    <div>
      <div className="md:flex-grow mx-16">
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
          <div className="bg-[#ffffff] mt-2 md:mt-0 h-auto border border-gray-300 rounded-md">
            {jobApplied.length === 0 ? (
              <div className="text-center text-gray-500">Data tidak ada</div>
            ) : (
              jobApplied.map((job, index) => (
                <div
                  key={job.uuid}
                  className="cursor-pointer hover:shadow-lg p-3 m-4 border border-gray-300 bg-[#f9f9f9] w-auto rounded-md"
                >
                  <div className="w-full">
                    <div className="flex rounded-xl w-auto">
                      <div className="hidden md:block">
                        <img
                          src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                          className="rounded-full w-12 h-12"
                          alt="avatar"
                        />
                      </div>
                      <div className="md:ml-4 mt-3">
                        <div className="flex justify-between w-full">
                          <div className="text-base font-bold cursor-pointer">
                            {job.job.title || <Skeleton />}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="mt-3 text-[#89898d]">
                        {job.job.description
                          .substring(0, 300)
                          .replace(regex, "") || <Skeleton count={3} />}
                      </div>
                      <div className="mt-3">
                        <div className="cursor-pointer p-2 mb-2 bg-[#d8da84] rounded-md inline-block  text-[#f6f8eb] mr-2">
                          {job.status || <Skeleton />}
                        </div>
                      </div>
                      <div className="mt-2 ">
                        <div className="h-full bg-gray-400 p-[0.5px] rounded-lg"></div>
                        <div className="">
                          <div className="flex items-center text-base mt-3">
                            <IoLocationSharp className="text-red-700 text-xl" />
                            <div className="flex justify-between w-full">
                              <div className="text-[#89898d] text-base">
                                &nbsp;{job.job.address || <Skeleton />}
                              </div>
                              <div className="text-[#89898d] text-base">
                                {format(
                                  new Date(job.createdAt),
                                  "dd MMMM yyyy",
                                  {
                                    locale: id,
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </SkeletonTheme>
        {/* <div className="mt-4">
          <Paginate
            totalPosts={jobs.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div> */}
      </div>{" "}
    </div>
  );
};

export default IndexJobApplied;
