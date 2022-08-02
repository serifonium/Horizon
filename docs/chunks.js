


function chunkArray2d(e, t, n = {}, r = v(1, 1)) {
    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new Chunk(v(e * r.x, t * r.y));
    }
    return { array: a, data: n };
}
function tileArray2d(e, t, n, r) {
    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new Tile(
                n * 1 + e * (1 / chunk.rows),
                r * 1 + t * (1 / chunk.columns)
            );
    }
    return a;
}


function Tile(e, t, n = !0) {
    this.pos = v(e, t)
}
function Chunk(e) {
    (this.mobiles = new Array()),
        (this.furnitureMobiles = new Array()),
        (this.grid = [
            tileArray2d(chunk.rows, chunk.columns, e.x, e.y),
            tileArray2d(chunk.rows, chunk.columns, e.x, e.y),
        ]),
        (this.pos = e);
}
var chunk = {
    rows: 5,
    columns: 5,
    width: 10,
    height: 10,
    xSet: randInt(-1e6, 1e6),
    ySet: randInt(-1e6, 1e6),
};
let startingSize = 5;

var chunks = {
    ...chunks,
    x1y1array: chunkArray2d(startingSize, startingSize, "x1y1", v(1, 1)),
    x0y1array: chunkArray2d(startingSize, startingSize, "x0y1", v(-1, 1)),
    x1y0array: chunkArray2d(startingSize, startingSize, "x1y0", v(1, -1)),
    x0y0array: chunkArray2d(startingSize, startingSize, "x0y0", v(-1, -1)),
    requestChunk(e, t) {
        let n = e < 0 ? (t < 0 ? "x0y0" : "x0y1") : t < 0 ? "x1y0" : "x1y1",
            r = chunks[n + "array"].array;
        requestArrayData = chunks[n + "array"].data;
        let a = e < 0 ? -1 * e : e,
            l = t < 0 ? -1 * t : t;
        return (
            r.length - 1 < a &&
            ((r[a] = new Array()), (r[a][l] = new Chunk(v(e, t)))),
            null == r[a] && (r[a] = new Array()),
            r[a].length - 1 < l && (r[a][l] = new Chunk(v(e, t))),
            null == r[a][l] && (r[a][l] = new Chunk(v(e, t))),
            r[a][l]
        );
    },
    requestTile(e, t) {
        let n = v(Math.floor(e / chunk.rows), Math.floor(t / chunk.columns));
        return (
            (tileP = v(e - n.x * chunk.rows, t - n.y * chunk.columns)),
            chunks.requestChunk(n.x, n.y).grid[0][tileP.x][tileP.y]
        );
    },
    requestChunks(e, t, n, r) {
        let a = new Array();
        for (let l = n; l > 0; l--)
            for (let n = 0; n < r; n++) a.push(chunks.requestChunk(l + e, n + t));
        return a;
    },
    getMobiles(e) {
        let t = new Array(),
            n = new Array();
        for (let r = 0; r < e.length; r++) {
            const a = e[r];
            for (let e = 0; e < a.mobiles.length; e++) {
                const n = a.mobiles[e];
                t.push(n);
            }
            for (let e = 0; e < a.furnitureMobiles.length; e++) {
                const t = a.furnitureMobiles[e];
                n.push(t);
            }
        }
        return { mobs: t, furnitureMobs: n };
    },
    removeMob(e, t, n) {
        let r = chunks.requestChunk(e, t);
        for (let e = 0; e < r.mobiles.length; e++) {
            if (r.mobiles[e].id == n) {
                r.mobiles.splice(e, 1);
                break;
            }
        }
    },
    insertMob(e, t, n) {
        let r = chunks.requestChunk(e, t);
        return chunks.removeMob(e, t, n.id), r.mobiles.push(n), n;
    },
};
