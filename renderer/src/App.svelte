<script lang="ts">
  import {
    name,
    card_number,
    acc_points,
    today_points,
    redeemable_points,
    expire_date,
    points_expire,
    points_expire_date,
  } from "../../scraper/data.json";
  import logo from "./assets/logo.png";
  import upDiamond from "./assets/up_diamond.png";
  import bg from "./assets/bg.png";
  import addnew from "./assets/addnew.png";

  import { untrack } from "svelte";
  import { format } from "date-fns/format";

  import MultitapButton from "./lib/MultitapButton.svelte";
  import DebugView from "./lib/DebugView.svelte";
  import Card from "./lib/Card.svelte";

  const expire_date_display = format(new Date(expire_date), "dd/MM/yyyy");
  const points_expire_date_display = format(
    new Date(points_expire_date),
    "dd/MM/yyyy",
  );
  const progress = Math.min(Math.round((acc_points / 1200) * 100), 100);

  const _title = "MyMK หน้าแรก";
  let title = $state("");
  let isDebug = $state(false);

  const mode = import.meta.env.MODE;
  const env = import.meta.env.VITE_VERCEL_ENV;

  $effect(() => {
    if (mode === "production" && env === "production") {
      title = _title;
    } else if (mode === "production") {
      title = `[${env}] ` + _title;
    } else {
      title = `[${mode}] ` + _title;
    }

    if (isDebug) {
      const previous = untrack(() => title);
      title = `${previous} (debug)`;
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main class="stretched bg-white">
  <header>
    <nav
      class="navbar navbar-light bg-white fixed-top navbar-expand-md bottom-shadow"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/" style="color: gray">
          <img src={logo} alt="Logo" width="80" height="60" aria-label="Logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle icon"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <span class="offcanvas-title" id="offcanvasNavbarLabel"></span>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul
              class="navbar-nav justify-content-end flex-grow-1 pe-3 text-center"
            >
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#th/home"
                  >หน้าแรก</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#th/profile">ข้อมูลส่วนตัว</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#th/order-history"
                  >ประวัติการซื้อบัตรสมาชิก</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#th/change-password"
                  >เปลี่ยนรหัสผ่าน</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.mkrestaurant.com/th/card"
                  target="_blank">ประเภทบัตรสมาชิก MK</a
                >
              </li>

              <li class="nav-item d-block d-sm-none d-sm-block d-md-none">
                <a class="nav-link" aria-current="page" href="#th/contact"
                  >ติดต่อเรา</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#th/logout"
                  >ลงชื่อออก</a
                >
                <form
                  id="logout-form"
                  action="#th/logout"
                  method="POST"
                  class="d-none"
                >
                  <input
                    name="_token"
                    type="hidden"
                    value="s1FyH3i7F6g5zr8Hm7BLw63SRJUqZO28TCi7ZMTC"
                  />
                </form>
              </li>

              <li
                class="nav-item d-block d-sm-none d-sm-block d-md-none d-flex justify-content-center py-5"
              >
                <div class="col-2">
                  <hr style="height: 2px; margin:0px;" />
                </div>
              </li>

              <li class="nav-item d-block d-sm-none d-sm-block d-md-none">
                <span class="nav-link">
                  <a aria-current="page" href="#th/home">TH</a>
                  |
                  <a aria-current="page" href="#en/home">EN</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div
      class="container-fluid pt-5 pb-1"
      id="main"
      style={`background-image: url(${bg}); background-repeat: repeat;`}
    >
      <div class="row justify-content-center pt-5">
        <div class="col-12 pt-2">
          <div
            id="carouselCard"
            class="carousel slide pointer-event"
            data-bs-ride="carousel"
            data-bs-interval="false"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselCard"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselCard"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item w-100 active">
                <div class="row text-center">
                  <div class="area1"></div>
                  <div class="card loginfm shadow-sm card-radius" id="card">
                    <Card />
                    <div>
                      <div class="card-body">
                        <div>
                          <h6>คลิกที่บัตรสมาชิกเพื่อสแกนบัตร</h6>
                        </div>

                        <div class="row d-flex justify-content-center mt-2">
                          <div class="col-md-3 col-10">
                            <hr />
                          </div>
                        </div>

                        <div class="row d-flex justify-content-center mt-1">
                          <div class="col-12" style="font-size:12px;">
                            <span>MAINTAIN</span>
                          </div>
                          <div class="col-12">
                            <h6 class="fw-bold">MK DIAMOND CARD</h6>
                          </div>

                          <div
                            class="row g-1 d-flex justify-content-center"
                            style="margin-top:-12px;"
                          >
                            <div
                              class="col-7 col-md-4 col-lg-3 col-xl-2 my-auto"
                            >
                              <div
                                class="progress"
                                style="height: 10px;background-color: #c2c2c2;"
                              >
                                <div
                                  class="progress-bar bg-danger"
                                  role="progressbar"
                                  style={`width: ${progress}%;`}
                                  aria-valuenow={progress}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {progress}%
                                </div>
                              </div>
                            </div>
                            <div class="col-auto">
                              <img
                                src={upDiamond}
                                alt="upgrade to diamond"
                                width="80"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          class="row d-flex justify-content-center"
                          style="margin-top:-10px;"
                        >
                          <div style="font-size: 15px;">
                            คะแนนปรับระดับสะสม <span
                              class="txt-red"
                              style="font-size: 20px;"
                              >{(acc_points ?? 0).toLocaleString()}</span
                            >/1,200 คะแนน
                          </div>
                          <span style="font-size: 10px;">
                            สะสมภายใน {expire_date_display}</span
                          >
                        </div>
                        <div class="row d-flex justify-content-center">
                          <div class="col-md-3 col-10">
                            <hr />
                          </div>
                        </div>

                        <div class="mt-2">
                          <h4>{name}</h4>
                        </div>
                        <ul class="list-inline mt-3">
                          <li class="list-inline-item p-divider">
                            <a href="#my-coupon" class="h5 text-success"
                              >คูปองของฉัน
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#redeem" class="h5 text-success"
                              >แลกคะแนนสะสม
                            </a>
                          </li>
                        </ul>

                        <div
                          class="mx-auto detail-profile"
                          style="width: 20rem; font-size:13px;"
                        >
                          <div class="text-start mx-1 my-2">
                            <div style="margin-left:8px;">
                              หมายเลขบัตรสมาชิก: <span class="txt-red">
                                {card_number}
                              </span>
                            </div>
                            <div style="margin-left:8px;">
                              บัตรสมาชิกหมดอายุ: <span class="txt-red">
                                {expire_date_display}
                              </span>
                            </div>
                            <div style="margin-left:8px;">
                              คะแนนสะสมวันนี้: <span class="txt-red">
                                {today_points}
                              </span> คะแนน
                            </div>
                            <div style="margin-left:8px;">
                              คะแนนแลกของรางวัล: <span class="txt-red">
                                {(redeemable_points ?? 0).toLocaleString()}
                              </span> คะแนน
                            </div>
                            <div style="margin-left:8px;color: #737373;">
                              วันหมดอายุ (คะแนนแลกของรางวัล):
                              <div class="ms-5">
                                {points_expire} คะแนน หมดอายุ - {points_expire_date_display}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="row d-flex justify-content-center g-2 mt-2 mb-4"
                        >
                          <a
                            class="btn btn-back"
                            href="#profile"
                            style="margin-right: 5px;"
                          >
                            แก้ไขข้อมูลส่วนตัว
                          </a>
                          <a
                            class="btn btn-back history"
                            style="margin-right: 5px;"
                            href="#history"
                          >
                            ประวัติการใช้งาน
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="carousel-item w-100">
                <div class="row text-center">
                  <div class="area1"></div>
                  <div class="card loginfm shadow-sm card-radius" id="card">
                    <div class="avatar mx-auto">
                      <a href="#products">
                        <img
                          src={addnew}
                          alt="add new card"
                          class="img-fluid"
                        />
                      </a>
                    </div>
                    <div style="height:500px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselCard"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselCard"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- End carouselCard-->
        </div>
      </div>
      <div id="history"></div>
    </div>
  </main>
  <footer class="footer mt-auto pb-2">
    <div class="d-flex justify-content-center">
      <div class="col-9 col-md-6 col-lg-6 col-xl-6 col-xxl-5">
        <hr style="height: 2px; margin:0px;" />
      </div>
    </div>
    <div class="container">
      <div class="footer-font">
        <div class="d-flex justify-content-center mt-2">
          <span> ติดต่อ MK Call Center 02-066-1000 </span>
        </div>
        <div class="d-flex justify-content-center mt-1">
          <span>จันทร์-ศุกร์: 08:00-21.00 น.</span>
        </div>
        <div class="d-flex justify-content-center mt-1">
          <span>เสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์: 10:00-21.00 น.</span>
        </div>
        <div class="row text-center">
          <div class="col-12 mt-1">
            <a href="#term-conditions" target="_blank"
              >ข้อกำหนดและเงื่อนไขสำหรับเว็บไซต์</a
            >
          </div>
          <div class="col-12 mt-1">
            <a
              href="https://docs.t-reg.co/b1061f38-6502-475e-9f48-f860b508c63a/PrvNtc/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%95%E0%B8%B1%E0%B8%A7.pdf"
              target="_blank">ประกาศความเป็นส่วนตัว</a
            >
          </div>
          <div class="col-12 mt-1">
            <a
              href="https://docs.t-reg.co/b1061f38-6502-475e-9f48-f860b508c63a/PrvNtc/%E0%B8%99%E0%B9%82%E0%B8%A2%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%84%E0%B8%B8%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89.pdf"
              target="_blank">นโยบายการใช้คุกกี้</a
            > &nbsp;&nbsp;
          </div>
          <div class="col-12 mt-1">
            <a href="#DataAccessRequest"
              >แบบฟอร์มการขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล</a
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <div class="social">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28"
            width="28"
            viewBox="0 0 512 512"
            ><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
              d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
            /></svg
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="26"
            viewBox="0 0 448 512"
            ><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
              d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"
            /></svg
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="26"
            viewBox="0 0 448 512"
            ><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
              d="M282 256.2l-95.2-54.1V310.3L282 256.2zM384 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm14.4 136.1c7.6 28.6 7.6 88.2 7.6 88.2s0 59.6-7.6 88.1c-4.2 15.8-16.5 27.7-32.2 31.9C337.9 384 224 384 224 384s-113.9 0-142.2-7.6c-15.7-4.2-28-16.1-32.2-31.9C42 315.9 42 256.3 42 256.3s0-59.7 7.6-88.2c4.2-15.8 16.5-28.2 32.2-32.4C110.1 128 224 128 224 128s113.9 0 142.2 7.7c15.7 4.2 28 16.6 32.2 32.4z"
            /></svg
          >
        </div>
      </div>
      <div class="d-flex justify-content-center footer-font mt-2">
        <span>
          © 2019
          <MultitapButton times={2} onMultitap={() => (isDebug = !isDebug)}>
            MK
          </MultitapButton>
          Restaurants Group PCL., All rights reserved.
        </span>
      </div>
    </div>
  </footer>
  {#if isDebug}
    <DebugView />
  {/if}
</main>
