// const faceList = [
//     [[0, 1, 5], [0, 5, 4]], // front
//     [[1, 2, 6], [1, 6, 5]], // right
//     [[2, 3, 7], [2, 7, 6]], // back
//     [[3, 0, 4], [3, 4, 7]], // left
//     [[4, 5, 6], [4, 6, 7]], // top
//     [[2, 0, 3], [1, 0, 2]]  // bottom
// ]

const faceList = [
    [[0, 1, 5]], // front
    [[1, 2, 6]], // right
    [[2, 3, 7]], // back
    [[3, 0, 4]], // left
    [[4, 5, 6]], // top
    [[2, 0, 3]], // bottom
]

const semantics = ['front', 'right', 'back', 'left', 'top', 'bottom']

class Vertex{
    #isActive = false;
    #activeIdx = 0;

    constructor(x, y, z, idx) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.i = idx;

        this.#activeIdx = idx;
    }

    set isActive(state) {
        this.#isActive = state;
    }

    get isActive() {
        return this.#isActive;
    }

    set mappedIndex(value) {
        this.#activeIdx = value;
    }

    get mappedIndex() {
        return this.#activeIdx;
    }

    asObj() {
        return ("v "+this.x+" "+this.y+" "+this.z+'\n');
    }
}

class Cell{
    #activeFaces=[];

    constructor(vs, state, vGrid) {
        this.vs = vs;
        this.ns = [null, null, null, null, null, null];
        this.s = state;
        this.vGrid = vGrid;
    }

    get front() {
        return this.ns[0];
    }

    set front(voxel) {
        this.ns[0] = voxel;
    }

    get right() {
        return this.ns[1];
    }

    set right(voxel) {
        this.ns[1] = voxel;
    }

    get back() {
        return this.ns[2];
    }

    set back(voxel) {
        this.ns[2] = voxel;
    }

    get left() {
        return this.ns[3];
    }

    set left(voxel) {
        this.ns[3] = voxel;
    }

    get top() {
        return this.ns[4];
    }

    set top(voxel) {
        this.ns[4] = voxel;
    }

    get bottom() {
        return this.ns[5];
    }

    set bottom(voxel) {
        this.ns[5] = voxel;
    }

    calculateNeighbours() {
        this.#activeFaces = [];
        for (var i = 0; i < 6; i++){
            if ((this.ns[i] === null) || !(this.ns[i].s === 0)) {
                var fIdxs = faceList[i];
                for (const indexes of fIdxs){
                    for (const idx of indexes){
                        this.vs[idx].isActive = true;
                    }
                }
                this.#activeFaces.push(i);
            }
        }
    }

    facesAsObj() {
        var fString = "";
        for (const idx of this.#activeFaces){
            // console.log(idx);
            var fIdxs = faceList[idx];
            for (const indexes of fIdxs){
                var locString = "f";
                for (const idx of indexes){
                    locString+=" "+(this.vs[idx].mappedIndex+1);
                }
                locString += '\n';
                fString += locString;
            }
        }

        return fString;
    }

    facesVertexlist() {
        var vertexArray = [];
        for (const i of this.#activeFaces) {
            var fIdxs = faceList[i];
            for (const indexes of fIdxs){
                for (const idx of indexes){
                    vertexArray.push(this.vs[idx].x);
                    vertexArray.push(this.vs[idx].y);
                    vertexArray.push(this.vs[idx].z);
                }
            }
        }

        return vertexArray;
    }

    // activePlane() {
    //     var
    // }
}

const floorGeometry = new Cell([], 0, null);

class VoxelGrid{
    constructor(x_cnt, y_cnt, z_cnt, spacing) {        
        this.constructFromGrid(x_cnt, y_cnt, z_cnt, spacing);
    }

    constructFromGrid(x_cnt, y_cnt, z_cnt, spacing) {
        // console.log(x_cnt, y_cnt, z_cnt);

        var x_v_cnt = x_cnt + 1;
        var y_v_cnt = y_cnt + 1;
        var z_v_cnt = z_cnt + 1;
        // constructing the vertices
        var idx = 0;
        this.vs = [];
        for (var i = 0; i < z_v_cnt; i++) {
            for (var j = 0; j < y_v_cnt; j++) {
                for (var k = 0; k < x_v_cnt; k++) {
                    this.vs.push(new Vertex(
                        k * spacing,
                        j * spacing,
                        i * spacing,
                        idx
                    ));
                    idx++;
                }
            }
        }

        // constructing the voxels
        this.voxels = [];
        var layer_area = y_v_cnt * z_v_cnt;
        for (var i = 0; i < z_cnt; i++) {
            for (var j = 0; j < y_cnt; j++) {
                for (var k = 0; k < x_cnt; k++) {
                    const l0 = i * layer_area;
                    const l1 = (i + 1) * layer_area;
                    const r0 = j * y_v_cnt;
                    const r1 = (j + 1) * y_v_cnt;
                    const ln0 = k;
                    const ln1 = k + 1;
                    const idxs = [
                        l0 + r0 + ln0, l0 + r0 + ln1, l0 + r1 + ln1, l0 + r1 + ln0,
                        l1 + r0 + ln0, l1 + r0 + ln1, l1 + r1 + ln1, l1 + r1 + ln0
                    ];
                    // console.log(idxs);

                    var voxelVertices = [
                        this.vs[l0 + r0 + ln0],
                        this.vs[l0 + r0 + ln1],
                        this.vs[l0 + r1 + ln1],
                        this.vs[l0 + r1 + ln0],
                        this.vs[l1 + r0 + ln0],
                        this.vs[l1 + r0 + ln1],
                        this.vs[l1 + r1 + ln1],
                        this.vs[l1 + r1 + ln0]
                    ];

                    this.voxels.push(new Cell(voxelVertices, 0, this));
                }
            }
        }

        // populating the neighbourhoods
        var x_l_area = y_cnt * z_cnt;
        // top and bottom
        for (var i = 0; i < z_cnt-1; i++) {
            for (var j = 0; j < y_cnt; j++) {
                for (var k = 0; k < x_cnt; k++) {
                    this.voxels[i * x_l_area + j * y_cnt + k].top = this.voxels[(i + 1) * x_l_area + j * y_cnt + k];
                    this.voxels[(i + 1) * x_l_area + j * y_cnt + k].bottom = this.voxels[i * x_l_area + j * y_cnt + k];
                }
            }
        }
        
        // left and right
        for (var i = 0; i < z_cnt; i++) {
            for (var j = 0; j < y_cnt - 1; j++) {
                for (var k = 0; k < x_cnt; k++) {
                    this.voxels[i * x_l_area + j * y_cnt + k].back = this.voxels[i * x_l_area + (j + 1) * y_cnt + k];
                    this.voxels[i * x_l_area + (j + 1) * y_cnt + k].front = this.voxels[i * x_l_area + j * y_cnt + k];
                }
            }
        }
        
        // front and back
        for (var i = 0; i < z_cnt; i++) {
            for (var j = 0; j < y_cnt; j++) {
                for (var k = 0; k < x_cnt - 1; k++) {
                    this.voxels[i * x_l_area + j * y_cnt + k].right = this.voxels[i * x_l_area + j * y_cnt + k + 1];
                    this.voxels[i * x_l_area + j * y_cnt + k + 1].left = this.voxels[i * x_l_area + j * y_cnt + k];
                }
            }
        }

        // setting floor voxel
        for (var j = 0; j < y_cnt; j++) {
            for (var k = 0; k < x_cnt; k++) {
                this.voxels[j * y_cnt + k].bottom = floorGeometry;
            }
        }

    }

    get vertices(){
        return this.vs;
    }

    calculateFaces(){
        for (const v of  this.voxels) {
            v.calculateNeighbours();
        }
    }

    remapVertices(){
        var cnt = 0;
        for(const v of this.vs){
            v.mappedIndex = cnt;
            if (v.isActive) {
                cnt ++;
            }
        }
    }

    constructVertexFaceListString() {
        this.calculateFaces();
        this.remapVertices();

        var objString = "";
        for (const v of this.vs) {
            if (v.isActive) { objString += v.asObj() };
        }
        for (const voxel of this.voxels) {
            objString += voxel.facesAsObj();
        }

        return objString;
    }

    constructVertexeList() {
        this.calculateFaces();
        this.remapVertices();

        var vArray = [];
        for (const voxel of this.voxels) {
            for (const value of voxel.facesVertexlist()) {
                vArray.push(value);
            }
        }
        
        return vArray;
    }
}

var vGrid = new VoxelGrid(10, 10, 10, 1.);
// console.log(vGrid.constructVertexFaceListString());
// console.log(vGrid.constructVertexeList());