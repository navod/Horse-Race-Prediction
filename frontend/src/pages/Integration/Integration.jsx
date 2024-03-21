import React from "react";
import SectionWrapper from "../../hoc/SectionWrapper";
import { logo, processes, rapidapi } from "../../assets";
import { RiArrowLeftRightLine } from "react-icons/ri";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import integrationService from "../../services/integration.service";
import ReactLoading from "react-loading";
import { ALERT_TYPE, toast } from "../../utils/Utility-func";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/slices/auth";
import local_storageService from "../../services/local_storage.service";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Integration = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disLoading, setDisLoading] = React.useState(false);

  const [disconnectModal, setDisconnectModal] = React.useState(false);

  const [apiKey, setApiKey] = React.useState("");

  const [hastError, setHasError] = React.useState(false);
  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openDisconnectModal = () => {
    setDisconnectModal(true);
  };

  const closeDisconnectModal = () => {
    setDisconnectModal(false);
  };

  const changeHandler = (e) => {
    setApiKey(e.target.value);
    if (apiKey.length > 0) {
      setHasError(false);
    }
  };

  const navigateToSite = (url) => {
    window.open(url, "_blank");
  };

  const connectSubmit = async () => {
    if (apiKey.trim().length === 0) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setLoading(true);

    try {
      const response = await integrationService.connect({
        user_id: userData.id,
        api_key: apiKey,
      });

      dispatch(setUserData({ ...userData, is_integrated: true }));
      local_storageService.saveUser({ ...userData, is_integrated: true });
      setLoading(false);
      closeModal();
      toast("Sync success", ALERT_TYPE.SUCCESS);
    } catch (res) {
      // if (res.hasOwnProperty("error")) {
      toast("Invalid Creditials", ALERT_TYPE.ERROR);
      // }
      setLoading(false);
    }
  };

  const disconnect = async () => {
    setLoading(true);

    try {
      const response = await integrationService.disconnect(userData.id);
      dispatch(setUserData({ ...userData, is_integrated: false }));
      local_storageService.saveUser({ ...userData, is_integrated: false });
      setDisLoading(false);
      closeDisconnectModal();

      toast("Disconnected", ALERT_TYPE.SUCCESS);
    } catch (res) {
      // if (res.hasOwnProperty("error")) {
      toast("Invalid Creditials", ALERT_TYPE.ERROR);
      // }
      setDisLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <h1 className="font-bold text-3xl mt-10 flex items-center gap-2">
          Connect with Rapid API
        </h1>
      </div>
      <p className="mt-10">
        To access our horse race details fetching service, please provide your
        RapidAPI key below. If you don't have a RapidAPI key yet, you can sign
        up for free at RapidAPI.com.
      </p>
      <div className="flex flex-col md:flex-row justify-between mt-10">
        {userData?.is_integrated ? (
          <button
            onClick={openDisconnectModal}
            className="bg-[#2CA141] mb-10 md:mb-0 text-white h-12 px-10 py-2 rounded-lg shadow-md"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={openModal}
            className="bg-[#0B60B0] mb-10 md:mb-0 text-white h-12 px-10 py-2 rounded-lg shadow-md"
          >
            Connect
          </button>
        )}

        <div className="flex items-center gap-4">
          <div className="shadow-md rounded-2xl w-44 h-28 px-4 py-4 justify-center flex border-2 border-[#CECECE]">
            <img src={rapidapi} className="w-[80%] object-contain" />
          </div>
          <div>
            <RiArrowLeftRightLine size={40} />
          </div>
          <div className="shadow-md rounded-2xl w-44 h-28 px-4 py-4 justify-center flex border-2 border-[#CECECE]">
            <img src={logo} className="w-[80%] object-contain" />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="integration modal"
      >
        <div className="p-4">
          <div className="flex  justify-between items-center">
            <h1 className="text-lg font-bold">Sync with RapidAPI</h1>
            <IoMdClose
              className="cursor-pointer"
              onClick={closeModal}
              size={20}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <div className="flex flex-col gap-2">
              <div className="gap-2 flex-col flex mt-10">
                <label className="text-sm font-bold">API Key</label>
                <input
                  type="text"
                  name="api_key"
                  required={true}
                  onChange={changeHandler}
                  placeholder="&SH6^S44c5STCTFS$65csfyafcdusd"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                {hastError && (
                  <span className="text-sm text-red-500">
                    API key cannot be empty
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center">
                {loading ? (
                  <ReactLoading
                    type="spin"
                    color="#0B60B0"
                    height={35}
                    width={35}
                    className="mt-10"
                  />
                ) : (
                  <button
                    onClick={connectSubmit}
                    className="bg-[#0B60B0] w-full mt-6 text-white h-10 px-10 py-2 rounded-full shadow-md"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
            <img src={rapidapi} className="w-40 object-contain" />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={disconnectModal}
        style={customStyles}
        contentLabel="disconnect modal"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg dark:bg-gray-700">
            <button
              type="button"
              onClick={closeDisconnectModal}
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to disconnect ?
              </h3>
              {disLoading ? (
                <div className="flex items-center justify-center">
                  <ReactLoading
                    type="spin"
                    color="#0B60B0"
                    height={35}
                    width={35}
                  />
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={disconnect}
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <div className="mt-10">
        <h1 className="text-xl font-bold">Why RapidAPI?</h1>
        <p className="mt-8">
          RapidAPI is a trusted platform that provides access to thousands of
          APIs, including the ones powering our horse race details fetching
          service. With RapidAPI, you can securely manage your API keys and
          access a wide range of services with ease.
        </p>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold">How to Get Your RapidAPI Key?</h1>
        <div className="flex flex-col md:flex-row justify-normal md:justify-between xl:gap-60 items-center">
          <div className="mt-8 flex flex-col gap-2">
            <p>
              1. Sign up for a RapidAPI account at{" "}
              <span
                className="font-semibold text-[#0B60B0] cursor-pointer"
                onClick={() => navigateToSite("https://rapidapi.com/hub")}
              >
                RapidAPI.com.
              </span>
            </p>
            <p>2. Once logged in, navigate to the Dashboard.</p>
            <p>
              3. Search
              <span
                className="font-semibold text-[#0B60B0] cursor-pointer"
                onClick={() =>
                  navigateToSite(
                    "https://rapidapi.com/ortegalex/api/horse-racing"
                  )
                }
              >
                {" "}
                Horse races
              </span>
            </p>
            <p>
              4. Go to{" "}
              <span
                className="font-semibold text-[#0B60B0] cursor-pointer"
                onClick={() =>
                  navigateToSite(
                    "https://rapidapi.com/ortegalex/api/horse-racing/pricing"
                  )
                }
              >
                Pricing
              </span>{" "}
              tab.
            </p>
            <p>5. Subscribe your package.</p>
            <p>6. Finally add your X-RapidAPI-Key</p>
          </div>

          <img src={processes} className="w-60" />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Integration, "integration");
