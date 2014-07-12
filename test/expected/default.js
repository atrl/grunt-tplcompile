define("fixtures/default", function (require, exports, module) {exports = module.exports = {"main":function (data) {
    var p = "";
    p += "";
    var lib = require("lib");
    p += "  ";
    if (false) {
        p += "  <div>test condition</div>  ";
    }
    p += "  <ul>  ";
    for (var i = 0; i < 5; i++) {
        p += "  <li>";
        p += i;
        p += "";
        p += lib.noop();
        p += "</li>  ";
    }
    p += "  </ul>      <div>test function name and function arguments</div>  ";
    function b(c, d) {
        var n = 1;
        return n + c + d + data.f;
    }
    p += "  ";
    p += b();
    p += "    <div>n is undeclared, will change to data.n</div>  ";
    p += data.n;
    p += "";
    return p;
}}});