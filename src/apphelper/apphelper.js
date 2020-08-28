import * as CryptoJS from 'crypto-js';

const apphelper = {

    NavigatPath: {
        login: process.env.PUBLIC_URL + '/login/',
        home: process.env.PUBLIC_URL + '/home/',
        frmerror: process.env.PUBLIC_URL + '/home/frmerror/',
        frmform: process.env.PUBLIC_URL + '/home/frmform/',
        frmlist: process.env.PUBLIC_URL + '/home/frmlist/',
        frmdragdrop: process.env.PUBLIC_URL + '/home/frmdragdrop/',
    },

    FormState: {
        ADD: 'ADD',
        EDIT: 'EDIT',
        VIEW: 'VIEW',
    },

    LoadingText: {
        Load: 'Loading...',
        Save: 'Saving...',
        Delete: 'Deleting...',
    },

    ConfigVar: {
        GridRow: 10,
        Decimal: 2,
        NumericTextStep: 1000
    },

    StringToBool: function (chk) {
        return chk == 'Y'
    },

    BoolToString: function (chk) {
        return chk ? 'Y' : 'N'
    },

    NextTab: function (event) {
        console.log(event)
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    },

    FormatNumber: function (num) {
        //console.log(num)
        //console.log(num.toLocaleString(navigator.language, { minimumFractionDigits: 2 }))
        return num.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
    },

    InitFormVar: function () {
        return {
            formstate: '',
            formname: '',
            canadd: true,
            canedit: true,
            candel: true,
            canprint: true,
            cancancel: true,
            canapprove: true,
            canunapprove: true,
            caneditdate: true,

            IsAddState: function () {
                //console.log(this.formstate);
                return this.formstate == 'ADD';
            },

            IsViewState: function () {
                //console.log(this.formstate);
                return this.formstate == 'VIEW';
            }
        }
    },

    IsNull: function (chk) {
        if (chk == undefined || chk == null || chk === '')
            return true;
        else
            return false;
    },

    Encode(text) {
        text = CryptoJS.AES.encrypt(JSON.stringify(text), 'secret key 4256').toString();
        //console.log(text)
        text = text.replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');
        return text;
    },

    Decode(text) {
        //console.log(text);
        if (this.IsNull(text))
            return { success: false, decodeText: 'ไม่พบ URL ที่ต้องการ' };

        text = text.toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
        try {
            var bytes = CryptoJS.AES.decrypt(text, 'secret key 4256');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return { success: true, decodeText: decryptedData };
        }
        catch {
            return { success: false, decodeText: 'ไม่พบ URL ที่ต้องการ' };
        }

    },

    CheckParams(param, page = '') {
        if (!this.IsNull(param)) {
            let paramChk = this.Decode(param);
            //console.log(paramChk)
            if (!paramChk.success) {

                localStorage.setItem("errortext_profreight", paramChk.decodeText);
                window.location.href = `${window.location.origin.toString()}/home/frmerror`
                return null;
            }

            return JSON.parse(paramChk.decodeText);
        } else {
            if (page.length > 0)
                window.location.href = `${window.location.origin.toString()}/home/${page}`

            return null;
        }
    },

    LogOut() {
        localStorage.removeItem('isLoggedIn_profreight');
        localStorage.removeItem('expires_at_profreight');

        localStorage.removeItem('user_profreight');
        localStorage.removeItem('compid_profreight');
        localStorage.removeItem('branchid_profreight');
        localStorage.removeItem('errortext_profreight');
        localStorage.removeItem('apiurl_profreight');
        localStorage.removeItem('apiuserurl_profreight');
        localStorage.removeItem('currentdate_profreight');
    }
}

export default apphelper;
