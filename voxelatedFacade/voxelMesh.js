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

    asTHREEV3() {
        return new THREE.Vector(this.x, this.y, this.z);
    }
}

class QuadFace{
    #isActive = false;

    constructor(vs, neighbouringFace, cell) {
        this.vs = vs;
        this.nf = neighbouringFace;
        this.c = cell;
    }

    set neighbour(voxelFace) {
        this.nf = voxelFace;
    }

    get neighbour() {
        return this.nf;
    }

    get isActive(){
        return this.#isActive;
    }

    faceVertices() {
        return [
            [this.vs[0], this.vs[1], this.vs[2]],
            [this.vs[0], this.vs[2], this.vs[3]],
        ];
    }

    center() {
        return (this.vs[0].asTHREEV3() + this.vs[2].asTHREEV3()) * .5;
    }

    baseX() {
        return (this.vs[1].asTHREEV3() - this.vs[0].asTHREEV3()).normalize();
    }

    baseY() {
        return (this.vs[3].asTHREEV3() - this.vs[0].asTHREEV3()).normalize();
    }

    baseZ() {
        return this.baseX().cross(this.baseY()).normalize();
    }

    frameMatrix() {
        const bX = this.baseX();
        const bY = this.baseY();
        const bZ = this.baseZ();
        const o = this.center();

        return [
            bX[0],bY[0],bZ[0],o[0],
            bX[1],bY[1],bZ[1],o[1],
            bX[2],bY[2],bZ[2],o[2],
            0,0,0,1
        ];
    }

    checkAdjacency() {
        if (this.c.s !== 0) {
            if (this.nf === null) {
                this.#isActive = true;
            } else if (this.nf.c.s === 0) {
                this.#isActive = true;
            }
        } else {
            this.#isActive = false;
        }

        for (const v of this.vs){
            v.isActive = this.#isActive;
        }
    }
}

class CubeCell{
    #activeFaces=[];

    constructor(vs, state, vGrid) {
        this.vs = vs;
        this.constructFaces(vs);
        this.s = state;
        this.vGrid = vGrid;
    }

    constructFaces(vs) {
        this.fs = [];
        this.fs.push(QuadFace([vs[0], vs[1], vs[5], vs[4]], null, this));
        this.fs.push(QuadFace([vs[1], vs[2], vs[6], vs[5]], null, this));
        this.fs.push(QuadFace([vs[2], vs[3], vs[7], vs[6]], null, this));
        this.fs.push(QuadFace([vs[3], vs[0], vs[4], vs[7]], null, this));
        this.fs.push(QuadFace([vs[4], vs[5], vs[6], vs[7]], null, this));
        this.fs.push(QuadFace([vs[2], vs[0], vs[3], vs[1]], null, this));
    }

    get front() {
        return this.fs[0];
    }

    set front(voxel) {
        this.fs[0].neighbour = voxel.back;
    }

    get right() {
        return this.fs[1];
    }

    set right(voxel) {
        this.fs[0].neighbour = voxel.left;
    }

    get back() {
        return this.fs[2];
    }

    set back(voxel) {
        this.fs[2].neighbour = voxel.front;
    }

    get left() {
        return this.fs[3];
    }

    set left(voxel) {
        this.fs[3].neighbour = voxel.right;
    }

    get top() {
        return this.fs[4];
    }

    set top(voxel) {
        this.fs[4].neighbour = voxel.bottom;
    }

    get bottom() {
        return this.fs[5];
    }

    set bottom(voxel) {
        this.fs[5].neighbour = voxel.top;
    }

    calculateNeighbours() {
        for (const f in this.fs){
            f.checkAdjacency();
        }
    }

    facesAsObj() {
        var fString = "";
        for (const f of this.fs){
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

    // facePlanes() {
    //     var frameMatrixes = [];

    //     for (const i of this.#activeFaces) {
    //         var fIdxs = faceList[i];
    //         const a = this.vs
    //     }
    // }

    // activePlane() {
    //     var
    // }
}

const floorGeometry = new CubeCell([], 0, null);

class VoxelGrid{
    constructor(x_cnt, y_cnt, z_cnt, spacing) {        
        this.constructFromGrid(x_cnt, y_cnt, z_cnt, spacing);
    }

    constructFromGrid(x_cnt, y_cnt, z_cnt, spacing) {
        // console.log(x_cnt, y_cnt, z_cnt);
        const xShift = spacing * x_cnt * .5;
        const yShift = spacing * y_cnt * .5;
        const zShift = spacing * z_cnt * .5;

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
                        k * spacing - xShift,
                        j * spacing - yShift,
                        i * spacing - zShift,
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

                    this.voxels.push(new QubeCell(voxelVertices, 0, this));
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