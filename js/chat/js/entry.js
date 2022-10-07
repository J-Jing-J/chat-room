// html中引入模块，可以用IIFE
// 函数中传入的参数，都是只在局部作用域中有效
;((doc, storage, location) => {
    const oUsername = doc.querySelector('#username')
    const oEnterBtn = doc.querySelector('#enter')

    // 模块需要初始化函数
    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        oEnterBtn.addEventListener('click', handleEnterBtnClick, false)
    }

    function handleEnterBtnClick() {
        const username = oUsername.value.trim()
        if(username.length < 6) {
            alert('用户名不小于六位');
            return
        }
        storage.setItem('username', username)
        location.href = 'index.html'
    }

    init()

})(document, localStorage, location)