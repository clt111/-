//格式化时间
const formatTime = (time)=>{
  if(time < 10) time = '0' + time
  return time
}
//翻转前面下面的盒子向上180deg
const rotateUp = (ele,time, n) => {
  //传入的为一开始翻转的元素，即前面下面的盒子，以及新时间，以及第几个li盒子
  let rotateDeg = 0;
  ele.style.zIndex=50;
  //这个是所有上面的盒子
  const allUpBox =  document.querySelector(`li:nth-child(${n})`).querySelectorAll('.upBox');
  //所有前面的盒子
  const beforeTime = document.querySelector(`li:nth-child(${n})`).querySelectorAll('.beforeTime');
  // 让上面后面的盒子先不可见，然后设置为270°
  allUpBox[1].style.display = 'none';
  allUpBox[1].transform = `rotateX(270deg)`;
  const animation = () => {
    rotateDeg+=3;
    ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`;
    if(rotateDeg == 90) {
      //让它更新为最近时间后隐藏
      ele.innerHTML = time
      ele.style.zIndex = -1;
      //让刚刚上面隐藏的盒子重新显示出来并且完成90°-180°的旋转
      allUpBox[1].style.display = 'block';
      allUpBox[0].style.zIndex = 1;
      rotateDown(allUpBox[1])
      allUpBox[1].style.zIndex = 1;
    }
    if(rotateDeg == 150) {
      beforeTime[0].innerHTML = time
    }
    if(rotateDeg < 180) {
      requestAnimationFrame(animation);
    }
  }
  animation()
} 
//翻转后面的盒子向下180deg
const rotateDown = (ele) => {
  let rotateDeg = 270;
  const animation = () => {
    rotateDeg+=3;
    ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`;
    if(rotateDeg < 360) {
      requestAnimationFrame(animation);
    }
  }
  animation()
} 
let time = new Date();
let oldHour = time.getHours();
var oldMinute = time.getMinutes();
var oldSecond = time.getSeconds();
document.querySelector('li:nth-child(1)').querySelectorAll('.beforeTime').forEach(ele=> ele.innerHTML = formatTime(oldHour));
document.querySelector(' li:nth-child(3)').querySelectorAll('.beforeTime').forEach(ele=> ele.innerHTML = formatTime(oldMinute));
document.querySelector(' li:nth-child(5)').querySelectorAll('.beforeTime').forEach(ele=> ele.innerHTML = formatTime(oldSecond));
const changeTime = ()=>{
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    const setHourBox = document.querySelector('li:nth-child(1)').querySelectorAll('.afterTime');
    if(!setHourBox[0].innerHTML || setHourBox[0].innerHTML!=formatTime(hour)) {
      if(setHourBox[0].innerHTML)  rotateUp(document.querySelector('li:nth-child(1)').querySelectorAll('.beforeTime')[1], formatTime(hour), 1);
      setHourBox.forEach(ele=> ele.innerHTML = formatTime(hour));
    }
    const setMinuteBox = document.querySelector('li:nth-child(3)').querySelectorAll('.afterTime');
    if(!setMinuteBox[0].innerHTML || setMinuteBox[0].innerHTML != formatTime(minute)) {
      if(setMinuteBox[0].innerHTML)  rotateUp(document.querySelector('li:nth-child(3)').querySelectorAll('.beforeTime')[1], formatTime(minute), 3);
      setMinuteBox.forEach(ele=> ele.innerHTML = formatTime(minute));
    }
    const setSecondBox = document.querySelector('li:nth-child(5)').querySelectorAll('.afterTime')
    setSecondBox.forEach(ele=> ele.innerHTML = formatTime(second));
    rotateUp(document.querySelector('li:nth-child(5)').querySelectorAll('.beforeTime')[1], formatTime(second), 5)
   
    setTimeout(changeTime,1000);
}
changeTime();




