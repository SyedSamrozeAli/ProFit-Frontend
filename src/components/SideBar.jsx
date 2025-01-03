import React, { useState, useEffect } from "react";
import { FiMenu, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Logo from "/images/profit-logo.png";
import Logo2 from "/images/logo2.png";
import SideBarLink from "./SideBarLink";
import "../styles/dashboard.css";

function SideBar({ isOpen, setIsOpen }) {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAttendanceDropdown = () => {
    setIsAttendanceOpen(!isAttendanceOpen);
  };

  const toggleFinanceDropdown = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  const dashboardSVG = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7385 2.56445H6.46722C3.48746 2.56445 2.84644 2.56445 2.84644 3.84661V9.95472C2.84644 11.5388 3.48746 11.5388 6.46722 11.5388H19.7385C22.7182 11.5388 23.3593 11.5388 23.3593 9.95472V4.14855C23.3593 3.20548 23.3593 2.56445 19.7385 2.56445Z"
        fill="currentColor"
      />
      <path
        d="M21.7014 13.6846H15.6249C14.7093 13.6846 13.967 14.4268 13.967 15.3424V21.4189C13.967 22.3345 14.7093 23.0768 15.6249 23.0768H21.7014C22.617 23.0768 23.3592 22.3345 23.3592 21.4189V15.3424C23.3592 14.4268 22.617 13.6846 21.7014 13.6846Z"
        fill="currentColor"
      />
      <path
        d="M10.5808 13.6846H4.50428C3.58868 13.6846 2.84644 14.4268 2.84644 15.3424V21.4189C2.84644 22.3345 3.58868 23.0768 4.50428 23.0768H10.5808C11.4964 23.0768 12.2386 22.3345 12.2386 21.4189V15.3424C12.2386 14.4268 11.4964 13.6846 10.5808 13.6846Z"
        fill="currentColor"
      />
    </svg>
  );
  const memberSVG = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1029 10.7146C15.2686 10.7146 17.0242 8.95902 17.0242 6.79335C17.0242 4.62769 15.2686 2.87207 13.1029 2.87207C10.9373 2.87207 9.18164 4.62769 9.18164 6.79335C9.18164 8.95902 10.9373 10.7146 13.1029 10.7146Z"
        fill="currentColor"
      />
      <path
        d="M21.0356 10.7143C22.4047 10.7143 23.5146 9.60442 23.5146 8.23532C23.5146 6.86622 22.4047 5.75635 21.0356 5.75635C19.6665 5.75635 18.5566 6.86622 18.5566 8.23532C18.5566 9.60442 19.6665 10.7143 21.0356 10.7143Z"
        fill="currentColor"
      />
      <path
        d="M5.17013 10.7143C6.53923 10.7143 7.6491 9.60442 7.6491 8.23532C7.6491 6.86622 6.53923 5.75635 5.17013 5.75635C3.80104 5.75635 2.69116 6.86622 2.69116 8.23532C2.69116 9.60442 3.80104 10.7143 5.17013 10.7143Z"
        fill="currentColor"
      />
      <path
        d="M7.61269 12.941C6.63688 12.1415 5.75315 12.2473 4.62486 12.2473C2.93735 12.2473 1.56445 13.6121 1.56445 15.2892V20.2116C1.56445 20.9399 2.15896 21.5322 2.89003 21.5322C6.04625 21.5322 5.66602 21.5893 5.66602 21.3961C5.66602 17.9081 5.25289 15.3502 7.61269 12.941Z"
        fill="currentColor"
      />
      <path
        d="M14.1761 12.2646C12.2054 12.1002 10.4924 12.2665 9.0149 13.4861C6.54237 15.4665 7.0182 18.1331 7.0182 21.3953C7.0182 22.2584 7.72042 22.9738 8.59663 22.9738C18.1106 22.9738 18.4892 23.2807 19.0534 22.0313C19.2384 21.6088 19.1877 21.7431 19.1877 17.7012C19.1877 14.4909 16.408 12.2646 14.1761 12.2646ZM21.581 12.2466C20.4466 12.2466 19.5677 12.1418 18.5932 12.9402C20.9354 15.3316 20.5399 17.715 20.5399 21.3953C20.5399 21.5898 20.2242 21.5315 23.2685 21.5315C24.0257 21.5315 24.6414 20.918 24.6414 20.164V15.2885C24.6414 13.6114 23.2685 12.2466 21.581 12.2466Z"
        fill="currentColor"
      />
    </svg>
  );
  const trainerSVG = (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.80703 17C10.532 14.375 13.067 12.5 15.987 12.81C18.767 13.105 20.977 15.45 21.117 18.24C21.152 18.975 21.052 19.68 20.837 20.335C20.707 20.735 20.317 21 19.892 21H5.00103C2.47703 21 0.584032 18.6905 1.07903 16.2155L4.12203 1H10.122L12.122 4.5L7.83703 7.565L6.62203 6"
        fill="currentColor"
      />
      <path
        d="M9.80703 17C10.532 14.375 13.067 12.5 15.987 12.81C18.767 13.105 20.977 15.45 21.117 18.24C21.152 18.975 21.052 19.68 20.837 20.335C20.707 20.735 20.317 21 19.892 21H5.00103C2.47703 21 0.584032 18.6905 1.07903 16.2155L4.12203 1H10.122L12.122 4.5L7.83703 7.565L6.62203 6M7.84203 7.565L10.122 16"
        stroke="currentColor"
        stroke-width="2"
        stroke-miterlimit="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const attendanceSVG = (
    <svg
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_293_4208)">
        <g clipPath="url(#clip1_293_4208)">
          <path
            d="M7.24481 5.0814H3.63546V21.6845H19.5166V5.0814H15.9073V6.52515H7.24481V5.0814ZM16.6291 12.3001H6.52294V10.8564H16.6291V12.3001ZM16.6291 18.0751H6.52294V16.6314H16.6291V18.0751ZM14.4635 5.0814V2.91577H8.68855V5.0814H14.4635Z"
            fill="currentColor"
          />
          <ellipse
            cx="18.7282"
            cy="17.1719"
            rx="5.19746"
            ry="5.1975"
            fill="#141613"
          />
          <path
            d="M18.9725 12.5964C18.072 12.5964 17.1916 12.8635 16.4428 13.3638C15.694 13.8641 15.1104 14.5753 14.7658 15.4073C14.4212 16.2393 14.331 17.1549 14.5067 18.0381C14.6824 18.9214 15.116 19.7327 15.7528 20.3695C16.3896 21.0063 17.201 21.44 18.0842 21.6157C18.9675 21.7914 19.883 21.7012 20.715 21.3566C21.547 21.0119 22.2582 20.4283 22.7585 19.6795C23.2588 18.9307 23.5259 18.0504 23.5259 17.1498C23.5247 15.9425 23.0446 14.7851 22.1909 13.9314C21.3373 13.0777 20.1798 12.5976 18.9725 12.5964ZM21.2248 16.3013L18.8393 18.6868C18.7586 18.7724 18.66 18.8392 18.5505 18.8823C18.3297 18.9711 18.0827 18.9711 17.862 18.8823C17.7537 18.8369 17.6556 18.7704 17.5732 18.6868L16.3916 17.5052C16.3481 17.4645 16.3133 17.4156 16.2891 17.3612C16.2649 17.3068 16.2519 17.2482 16.2508 17.1887C16.2497 17.1292 16.2606 17.0701 16.2828 17.0148C16.3049 16.9596 16.3379 16.9094 16.3799 16.8672C16.4218 16.825 16.4718 16.7916 16.5268 16.769C16.5819 16.7465 16.6409 16.7352 16.7004 16.7359C16.7599 16.7365 16.8187 16.7491 16.8732 16.7729C16.9278 16.7967 16.977 16.8312 17.0179 16.8744L18.204 18.0605L20.594 15.675C20.6353 15.6333 20.6844 15.6003 20.7385 15.5777C20.7927 15.5552 20.8507 15.5436 20.9094 15.5436C20.968 15.5436 21.0261 15.5552 21.0802 15.5777C21.1343 15.6003 21.1835 15.6333 21.2248 15.675C21.3035 15.7576 21.3475 15.8673 21.3475 15.9815C21.3475 16.0956 21.3035 16.2054 21.2248 16.288V16.3013Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_293_4208">
          <rect
            width="25.641"
            height="25.641"
            fill="currentColor"
            transform="translate(0.282227 0.461426)"
          />
        </clipPath>
        <clipPath id="clip1_293_4208">
          <rect
            width="22"
            height="22"
            fill="currentColor"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const paymentSVG = (
    <svg
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7487 10.6252C13.1036 10.6252 10.1381 13.5907 10.1381 17.2357C10.1381 20.8808 13.1036 23.8463 16.7487 23.8463C20.3938 23.8463 23.3593 20.8808 23.3593 17.2357C23.3593 13.5907 20.3938 10.6252 16.7487 10.6252ZM16.7487 16.6348C17.7428 16.6348 18.5516 17.4435 18.5516 18.4377C18.5516 19.2201 18.0476 19.8809 17.3496 20.1299V21.4425H16.1477V20.1299C15.4497 19.8809 14.9458 19.2201 14.9458 18.4377H16.1477C16.1477 18.7692 16.4171 19.0386 16.7487 19.0386C17.0802 19.0386 17.3496 18.7692 17.3496 18.4377C17.3496 18.1061 17.0802 17.8367 16.7487 17.8367C15.7545 17.8367 14.9458 17.028 14.9458 16.0338C14.9458 15.2514 15.4497 14.5905 16.1477 14.3416V13.029H17.3496V14.3416C18.0476 14.5905 18.5516 15.2514 18.5516 16.0338H17.3496C17.3496 15.7022 17.0802 15.4329 16.7487 15.4329C16.4171 15.4329 16.1477 15.7022 16.1477 16.0338C16.1477 16.3654 16.4171 16.6348 16.7487 16.6348ZM9.53714 10.6252C13.2439 10.6252 16.1477 9.04119 16.1477 7.01939C16.1477 4.9976 13.2439 3.3335 9.53714 3.3335C5.83041 3.3335 2.84644 4.9976 2.84644 7.01939C2.84644 9.04119 5.83041 10.6252 9.53714 10.6252ZM2.84644 16.8575V17.8367C2.84644 19.8585 5.83041 21.4425 9.53714 21.4425C9.7474 21.4425 9.95112 21.4231 10.1581 21.413C9.69085 20.6788 9.35036 19.8713 9.15092 19.0242C6.47043 18.9502 4.14299 18.1265 2.84644 16.8575ZM8.96507 17.8061C8.95128 17.6171 8.93618 17.4282 8.93618 17.2357C8.93618 16.6093 9.01827 16.0029 9.15825 15.4187C6.47444 15.346 4.14415 14.5219 2.84644 13.2517V14.2309C2.84644 16.1455 5.54123 17.6501 8.96507 17.8061ZM9.53714 14.2309L9.53898 14.2309C9.93262 13.2902 10.506 12.4353 11.227 11.7142C10.6843 11.7828 10.1234 11.8271 9.53714 11.8271C6.6839 11.8271 4.20565 10.9762 2.84644 9.64596V10.6252C2.84644 12.647 5.83041 14.2309 9.53714 14.2309Z"
        fill="currentColor"
      />
    </svg>
  );
  const equipmentSVG = (
    <svg
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_293_4223)">
        <path
          d="M5.0728 10.8821C4.93141 10.8626 4.78754 10.8717 4.64972 10.9088L2.58562 11.4622C2.45006 11.4986 2.32301 11.5614 2.21172 11.647C2.10044 11.7325 2.00711 11.8392 1.93706 11.9608C1.86701 12.0825 1.82162 12.2167 1.80348 12.3559C1.78534 12.4951 1.79481 12.6365 1.83134 12.772L1.97023 13.287C2.00644 13.4237 1.98696 13.5692 1.91606 13.6916C1.84517 13.8139 1.72864 13.9032 1.59203 13.9398L1.076 14.0797C0.940462 14.116 0.813405 14.1787 0.702088 14.2641C0.590771 14.3496 0.497374 14.4561 0.427232 14.5776C0.35709 14.6992 0.311576 14.8333 0.29329 14.9725C0.275004 15.1116 0.284304 15.253 0.32066 15.3885L1.97985 21.5797C2.01617 21.7153 2.07884 21.8423 2.16427 21.9536C2.24971 22.065 2.35623 22.1583 2.47777 22.2285C2.5993 22.2986 2.73346 22.3441 2.87259 22.3624C3.01171 22.3807 3.15308 22.3714 3.28861 22.3351L3.80357 22.1972C3.87133 22.179 3.94203 22.1742 4.01163 22.1833C4.08122 22.1924 4.14835 22.2151 4.20917 22.2501C4.26999 22.2851 4.32332 22.3318 4.36609 22.3874C4.40887 22.4431 4.44026 22.5066 4.45848 22.5744L4.59737 23.0904C4.67074 23.3639 4.84969 23.5971 5.09489 23.7387C5.34009 23.8804 5.63149 23.9188 5.90506 23.8457L7.9681 23.2923C8.24159 23.219 8.47478 23.04 8.61641 22.7948C8.75804 22.5496 8.79654 22.2582 8.72344 21.9846L7.69139 18.1331C7.65505 17.9919 7.67201 17.8423 7.73901 17.7128C7.80602 17.5834 7.91838 17.4831 8.05463 17.4312C9.67736 16.8658 11.3843 16.5801 13.1027 16.5861C15.1102 16.5861 16.7961 16.9569 18.1529 17.4312C18.4307 17.5295 18.591 17.8479 18.5151 18.1331L17.4831 21.9846C17.41 22.2582 17.4485 22.5496 17.5901 22.7948C17.7317 23.04 17.9649 23.219 18.2384 23.2923L20.3014 23.8457C20.437 23.8821 20.5783 23.8914 20.7175 23.8731C20.8566 23.8548 20.9907 23.8093 21.1123 23.7392C21.2338 23.669 21.3403 23.5756 21.4258 23.4643C21.5112 23.353 21.5739 23.2259 21.6102 23.0904L21.748 22.5744C21.7662 22.5066 21.7976 22.4431 21.8404 22.3874C21.8832 22.3318 21.9365 22.2851 21.9973 22.2501C22.0581 22.2151 22.1253 22.1924 22.1949 22.1833C22.2645 22.1742 22.3352 22.179 22.4029 22.1972L22.919 22.3351C23.1925 22.4082 23.4839 22.3697 23.7291 22.228C23.9743 22.0864 24.1533 21.8532 24.2266 21.5797L25.8858 15.3885C25.9222 15.253 25.9315 15.1116 25.9132 14.9725C25.8949 14.8333 25.8494 14.6992 25.7793 14.5776C25.7091 14.4561 25.6157 14.3496 25.5044 14.2641C25.3931 14.1787 25.266 14.116 25.1305 14.0797L24.6145 13.9408C24.4778 13.904 24.3614 13.8145 24.2906 13.6919C24.2199 13.5693 24.2008 13.4237 24.2373 13.287L24.3752 12.772C24.4115 12.6365 24.4208 12.4951 24.4025 12.356C24.3842 12.2169 24.3387 12.0827 24.2686 11.9612C24.1984 11.8397 24.105 11.7331 23.9937 11.6477C23.8824 11.5623 23.7553 11.4996 23.6198 11.4633L21.5557 10.9098C21.282 10.8368 20.9905 10.8754 20.7452 11.0173C20.5 11.1591 20.3212 11.3926 20.248 11.6663L19.3442 15.037C19.3273 15.1031 19.2967 15.165 19.2544 15.2185C19.2121 15.272 19.159 15.3161 19.0985 15.3477C19.038 15.3794 18.9716 15.3979 18.9035 15.4022C18.8353 15.4064 18.7671 15.3963 18.7031 15.3725C16.8999 14.7584 15.0076 14.4465 13.1027 14.4494C10.9286 14.4494 9.04395 14.8468 7.50228 15.3725C7.43834 15.3963 7.37009 15.4064 7.30198 15.4022C7.23386 15.3979 7.16741 15.3794 7.10694 15.3477C7.04647 15.3161 6.99334 15.272 6.95101 15.2185C6.90868 15.165 6.8781 15.1031 6.86126 15.037L5.95848 11.6663C5.90432 11.463 5.79139 11.2803 5.63383 11.141C5.47628 11.0017 5.28112 10.9109 5.0728 10.8821Z"
          fill="currentColor"
        />
        <g clipPath="url(#clip1_293_4223)">
          <path
            d="M13.1027 1.04346C12.173 1.04346 11.2641 1.31916 10.4911 1.83569C9.71801 2.35223 9.11549 3.0864 8.75969 3.94537C8.40389 4.80434 8.3108 5.74953 8.49218 6.6614C8.67357 7.57328 9.12128 8.41089 9.77871 9.06832C10.4361 9.72575 11.2737 10.1735 12.1856 10.3548C13.0975 10.5362 14.0427 10.4431 14.9017 10.0873C15.7606 9.73154 16.4948 9.12902 17.0113 8.35597C17.5279 7.58292 17.8036 6.67405 17.8036 5.74431C17.8021 4.49802 17.3064 3.30319 16.4251 2.42193C15.5438 1.54067 14.349 1.04493 13.1027 1.04346ZM14.6869 7.3285C14.6068 7.40862 14.4981 7.45362 14.3848 7.45362C14.2714 7.45362 14.1628 7.40862 14.0826 7.3285L12.8006 6.04645C12.7204 5.96632 12.6754 5.85764 12.6754 5.74431V3.18021C12.6754 3.06687 12.7204 2.95817 12.8005 2.87803C12.8807 2.79788 12.9894 2.75286 13.1027 2.75286C13.2161 2.75286 13.3248 2.79788 13.4049 2.87803C13.485 2.95817 13.5301 3.06687 13.5301 3.18021V5.56739L14.6869 6.72423C14.767 6.80437 14.812 6.91305 14.812 7.02636C14.812 7.13968 14.767 7.24836 14.6869 7.3285Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_293_4223">
          <rect
            width="25.641"
            height="25.641"
            fill="currentColor"
            transform="translate(0.282227 0.615479)"
          />
        </clipPath>
        <clipPath id="clip1_293_4223">
          <rect
            width="10.2564"
            height="10.2564"
            fill="currentColor"
            transform="translate(7.97461 0.615723)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const inventorySVG = (
    <svg
      width="26"
      height="27"
      viewBox="0 0 53 53"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M53 13.25L26.3013 0L0 13.25V16.5625H3.3125V53H9.9375V23.1875H43.0625V53H49.6875V16.5625H53V13.25ZM13.25 19.875V16.5625H19.875V19.875H13.25ZM23.1875 19.875V16.5625H29.8125V19.875H23.1875ZM33.125 19.875V16.5625H39.75V19.875H33.125Z"
        fill="currentColor"
      />
      <path
        d="M19.875 29.8125H16.5625V26.5H13.25V36.4375H23.1875V26.5H19.875V29.8125ZM19.875 43.0625H16.5625V39.75H13.25V49.6875H23.1875V39.75H19.875V43.0625ZM33.125 43.0625H29.8125V39.75H26.5V49.6875H36.4375V39.75H33.125V43.0625Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div
      className={`bg-black h-full ${
        isOpen ? "sm:w-full lg:w-[220px]" : "w-[60px]"
      } relative top-0 left-0 z-40 transition-all duration-300 sidebar ${
        isOpen ? "sm:relative" : "absolute"
      }  sm:relative sm:z-auto`}
    >
      <div className="p-4 flex flex-col gap-2 justify-center">
        <button
          className=" text-white z-50 top-5 left-4 sm:left-4"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>

        {isOpen ? (
          <div className="mb-4 mt-8">
            <img src={Logo} alt="Profit Logo" className="w-full h-auto" />
          </div>
        ) : (
          <div className="mt-8">
            <img src={Logo2} alt="Profit Logo" />
          </div>
        )}

        {/* Sidebar Links */}
        <div
          className="flex flex-col gap-5 sm:gap-7"
          style={{
            marginTop: isOpen ? "0.7rem" : "4rem",
            paddingLeft: !isOpen ? "0" : "1rem",
          }}
        >
          <SideBarLink
            svg={dashboardSVG}
            text="Dashboard"
            to="/admin/dashboard"
            isOpen={isOpen}
          />
          <SideBarLink
            svg={memberSVG}
            text="Manage Members"
            to="/admin/members"
            isOpen={isOpen}
          />
          <SideBarLink
            svg={trainerSVG}
            text="Manage Trainers"
            to="/admin/trainers"
            isOpen={isOpen}
          />

          {/* Attendance Dropdown */}
          <div className="relative">
            <button
              onClick={toggleAttendanceDropdown}
              className={`flex items-center justify-between w-full text-white  ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <div className="flex items-center ">
                {attendanceSVG}
                {isOpen && (
                  <span className="ml-2 font-myFont text-sm">Attendance</span>
                )}
              </div>
              {isOpen && (
                <span>
                  {isAttendanceOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </button>
            {isAttendanceOpen && isOpen && (
              <div className="ml-4 flex flex-col gap-4 mt-4">
                <SideBarLink
                  text="Member Attendance"
                  to="/admin/attendance"
                  isOpen={isOpen}
                />
                <SideBarLink
                  className="mt-4"
                  text="Trainer Attendance"
                  to="/admin/trainerattendance"
                  isOpen={isOpen}
                />
              </div>
            )}
          </div>

          <SideBarLink
            svg={inventorySVG}
            text="Inventory"
            to="/admin/inventory"
            isOpen={isOpen}
          />
          <SideBarLink
            svg={equipmentSVG}
            text="Equipment"
            to="/admin/equipment"
            isOpen={isOpen}
          />

          <div className="relative">
            <button
              onClick={toggleFinanceDropdown}
              className={`flex items-center justify-between w-full text-white  ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <div className="flex items-center ">
                {paymentSVG}
                {isOpen && <span className="ml-2 text-sm">Manage Finance</span>}
              </div>
              {isOpen && (
                <span>
                  {isFinanceOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </button>
            {isFinanceOpen && isOpen && (
              <div className="ml-4 flex flex-col gap-3 mt-4">
                <SideBarLink
                  text="Member"
                  to="/admin/member/payments"
                  isOpen={isOpen}
                />
                <SideBarLink
                  className="mt-4"
                  text="Trainer"
                  to="/admin/trainer/payments"
                  isOpen={isOpen}
                />
                <SideBarLink
                  className="mt-4"
                  text="Inventory"
                  to="/admin/inventory/payments"
                  isOpen={isOpen}
                />
                <SideBarLink
                  className="mt-4"
                  text="Other Expense"
                  to="/admin/expense/payments"
                  isOpen={isOpen}
                />
                <SideBarLink
                  className="mt-4"
                  text="Generate Report"
                  to="/admin/finance-report-generate"
                  isOpen={isOpen}
                />
              </div>
            )}
          </div>
          {/* <SideBarLink
            svg={settingsSVG}
            text="Settings"
            to="/admin/settings"
            isOpen={isOpen}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
