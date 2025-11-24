const SHEET_URL = "https://docs.google.com/spreadsheets/d/10QuEfCxwiaXJooVjywqBZMaMVLQwAPiHPFru9kquOvA/gviz/tq?tqx=out:json";

// 文字列を正規化（先頭 ' を除去）
function normalize(v) {
    if (!v) return "";
    return String(v).replace(/^'/, "");
}

async function checkPassword() {
    const params = new URLSearchParams(window.location.search);
    const id = normalize(params.get("id"));
    const inputCode = normalize(document.getElementById("code").value.trim());

    if (!id) {
        alert("ID が見つかりません");
        return;
    }

    try {
        const res = await fetch(SHEET_URL);
        let text = await res.text();
        let json = JSON.parse(text.substring(47, text.length - 2));
        let rows = json.table.rows;

        let match = rows.find(r => {
            const sheetId = normalize(r.c[0]?.v);
            const sheetCode = normalize(r.c[2]?.v);
            return sheetId === id && sheetCode === inputCode;
        });

        if (match) {
            alert("正しいコードです！");
        } else {
            alert("コードが違います");
        }

    } catch (error) {
        alert("エラーが発生しました：" + error);
    }
}
