const SHEET_URL = "https://docs.google.com/spreadsheets/d/10QuEfCxwiaXJooVjywqBZMaMVLQwAPiHPFru9kquOvA/gviz/tq?tqx=out:json";

async function checkPassword() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");   // ← URL の ID
    const inputCode = document.getElementById("code").value.trim();

    if (!id) {
        alert("ID が見つかりません");
        return;
    }

    const res = await fetch(SHEET_URL);
    let text = await res.text();
    let json = JSON.parse(text.substring(47, text.length - 2));
    let rows = json.table.rows;

    // シートの A列（ID）, C列（パスコード）を確認
    let match = rows.find(r => 
        r.c[0]?.v === id && String(r.c[2]?.v) === inputCode
    );

    if (match) {
        alert("正しいコードです！");
    } else {
        alert("コードが違います");
    }
}
