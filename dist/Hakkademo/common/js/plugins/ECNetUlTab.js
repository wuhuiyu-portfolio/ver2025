(function($) {
    //巢狀UL頁籤
    $.fn.ECNetUlTabs = function(settings) {
        settings = jQuery.extend({
            minHeight: 0, //(integer)整個頁籤區塊最小高度
            extHeight: -55, //(integer)整個頁籤區塊高度調整值
            tabClassName: "tab", //(string)頁籤class
            selectedTabClassName: "selectedTab", //(string)被選取頁籤的class
            contentClassName: "content", //(string)內容區塊的class
            defaultTabIndex: 0, //(integer)預設顯示的頁籤
            tabFade: false, //(boolean)頁籤淡入效果
            contentFade: false, //(boolean)內容淡入效果
            fadeSpeed: 800, //(integer)淡入效果速度,
            click: null,
            mouseover: null,
            focus: null,
            event: "click" //(string)要使用的事件 click|mouseenter
        }, settings);

        var tabs = this;

        function initialize() {
            //先將設有被選取頁籤的class, 設為未選取
            tabs.children("li").children("." + settings.selectedTabClassName).removeClass(settings.selectedTabClassName).addClass(settings.tabClassName);

            //設定預設選取頁籤的class
            tabs.children("li").children("." + settings.tabClassName).eq(settings.defaultTabIndex).removeClass(settings.tabClassName).addClass(settings.selectedTabClassName);

            //設定內容區塊的CSS
            tabs.children("li").children("." + settings.contentClassName).css({ position: "absolute", left: "0", display: "none" });

            //設定預設顯示的內容區塊
            tabs.children("li").children("." + settings.contentClassName).eq(settings.defaultTabIndex).css("display", "block");

            //設定預設高度
            var defaultHeight = tabs.children("li").children("." + settings.contentClassName).eq(settings.defaultTabIndex).outerHeight(true) + settings.extHeight;
            if (defaultHeight < settings.minHeight) {
                defaultHeight = settings.minHeight;
            }
            tabs.css("height", defaultHeight + "px");

            if (settings.click) {
                tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).click(function() {
                    TabChange($(this));
                });
            }


            if (settings.mouseover) {
                tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).bind("mouseenter", function() {
                    TabChange($(this));
                    this.focus();
                });
            }

            if (settings.focus) {
                tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).bind("focus", function() {
                    if ($(this).attr('class').toString() == settings.tabClassName) { TabChange($(this)); }
                });
            }

            var eventset = (settings.click == null || settings.mouseover == null || settings.focus == null);


            switch (settings.event) {

                case "click":
                    if (eventset) {
                        tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).click(function() {
                            TabChange($(this));
                        });
                    }
                    break;

                case "mouseenter":
                    if (eventset) {
                        tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).bind("mouseenter", function() {
                            TabChange($(this)); this.focus();
                        });
                    }
                    break;

                case "focus":
                    if (eventset) {
                        tabs.children("li").children("." + settings.tabClassName + ",." + settings.selectedTabClassName).bind("focus", function() {
                            if ($(this).attr('class').toString() == settings.tabClassName) { TabChange($(this)); }
                        });
                    }
                    break;
            }
            //修正第一次執行時,上方的區塊會異常 
            TabChange(tabs.children("li:first").children("." + settings.tabClassName + ",." + settings.selectedTabClassName));
        }

        //頁籤變換
        function TabChange(selectedTab) {
            //設定所有頁籤為未選擇
            tabs.children("li").children("." + settings.selectedTabClassName).removeClass(settings.selectedTabClassName).addClass(settings.tabClassName);

            //設定被選擇頁籤
            if (!settings.tabFade) {
                selectedTab.removeClass(settings.tabClassName).addClass(settings.selectedTabClassName);
            }
            else {
                //淡入效果
                selectedTab.removeClass(settings.tabClassName).addClass(settings.selectedTabClassName).css("display", "none").fadeIn(settings.fadeSpeed);
            }

            //計算頁籤內容高度+調整值, 給外層ul
            var height = selectedTab.parent("li").children("." + settings.contentClassName).outerHeight(true) + settings.extHeight;
            if (height < settings.minHeight) height = settings.minHeight;
            tabs.css("height", height + "px");

            //隱藏所有頁籤內容
            tabs.children("li").children("." + settings.contentClassName).css("display", "none");

            //顯示被選擇的頁籤內容
            if (!settings.contentFade) {
                selectedTab.parent("li").children("." + settings.contentClassName).css("display", "block");
            }
            else {
                //淡入效果
                selectedTab.parent("li").children("." + settings.contentClassName).fadeIn(settings.fadeSpeed);
            }
        }
        initialize();
    };
})(jQuery);


