// const faceList = [
//     [[0, 1, 5], [0, 5, 4]], // front
//     [[1, 2, 6], [1, 6, 5]], // right
//     [[2, 3, 7], [2, 7, 6]], // back
//     [[3, 0, 4], [3, 4, 7]], // left
//     [[4, 5, 6], [4, 6, 7]], // top
//     [[2, 0, 3], [1, 0, 2]]  // bottom
// ]

// const faceList = [
//     [[0, 1, 5]], // front
//     [[1, 2, 6]], // right
//     [[2, 3, 7]], // back
//     [[3, 0, 4]], // left
//     [[4, 5, 6]], // top
//     [[2, 0, 3]], // bottom
// ]

const semantics = ['front', 'right', 'back', 'left', 'top', 'bottom']

class Vertex{
    #isActive = false;
    #activeIdx = 0;

    constructor(x, y, z, idx) {
        this.v = new THREE.Vector3(x, y, z);
        this.i = idx;

        this.#activeIdx = idx;
    }

    get x(){
        return this.v.x;
    }

    get y(){
        return this.v.y;
    }

    get z(){
        return this.v.z;
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
        return this.v;
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

    faceVerticesArray() {
        return [
            this.vs[0], this.vs[1], this.vs[2],
            this.vs[0], this.vs[2], this.vs[3],
        ];
    }

    get center() {
        var v = this.vs[0].v.clone();
        return v.add(this.vs[2].v).multiplyScalar(.5);
    }

    get baseX() {
        var v = this.vs[1].v.clone();
        return v.sub(this.vs[0].v).normalize();
    }

    get baseY() {
        var v = this.vs[3].v.clone();
        return v.sub(this.vs[0].v).normalize();
    }

    get baseZ() {
        return this.baseX.cross(this.baseY).normalize();
    }

    frameMatrix() {
        const bX = this.baseX;
        const bY = this.baseY;
        const bZ = this.baseZ;
        const o = this.center;

        var locMatrix = new THREE.Matrix4();
        // locMatrix.elements = Array.from([
        //     bX.x,bY.x,bZ.x,o.x,
        //     bX.y,bY.y,bZ.y,o.y,
        //     bX.z,bY.z,bZ.z,o.z,
        //     0,0,0,1
        // ]);

        locMatrix.elements = Array.from([
            bX.x,bX.y,bX.z,0,
            bY.x,bY.y,bY.z,0,
            bZ.x,bZ.y,bZ.z,0,
            o.x,o.y,o.z,1
        ]);

        return locMatrix;
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

        for (const v of this.vs) {
            v.isActive = this.#isActive;
        }

        return this.#isActive;
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
        this.fs.push(new QuadFace([vs[0], vs[1], vs[5], vs[4]], null, this)); // front
        this.fs.push(new QuadFace([vs[1], vs[2], vs[6], vs[5]], null, this)); // right
        this.fs.push(new QuadFace([vs[2], vs[3], vs[7], vs[6]], null, this)); // back
        this.fs.push(new QuadFace([vs[3], vs[0], vs[4], vs[7]], null, this)); // left
        this.fs.push(new QuadFace([vs[4], vs[5], vs[6], vs[7]], null, this)); // top
        this.fs.push(new QuadFace([vs[3], vs[2], vs[1], vs[0]], null, this)); // bottom
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
        this.fs[1].neighbour = voxel.left;
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
        var fCount = 0;
        this.#activeFaces = [];

        for (const f of this.fs){
            if (f.checkAdjacency()){
                fCount += 1;
                this.#activeFaces.push(f);
            }
        }

        return fCount;
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

    facesVertexlist(vertexArray) {
        for (const f of this.#activeFaces) {
            for (const v of f.faceVerticesArray()){
                vertexArray.push(v.x);
                vertexArray.push(v.y);
                vertexArray.push(v.z);
            }
        }

        return vertexArray;
    }

    activeFacesMatrix(matrixArray) {
        for (const f of this.#activeFaces) {
            matrixArray.push(f.frameMatrix());
        }
    }

    get activeFaces() {
        return this.#activeFaces;
    }
}

const floorGeometry = new CubeCell([
    null, null, null, null,
    null, null, null, null
], 1, null);

class VoxelGrid{
    constructor(x_cnt, y_cnt, z_cnt, spacing) {        
        this.constructFromGrid(x_cnt, y_cnt, z_cnt, spacing);
    }

    constructFromGrid(x_cnt, y_cnt, z_cnt, spacing) {
        // console.log(x_cnt, y_cnt, z_cnt);

        const x_v_cnt = x_cnt + 1;
        const y_v_cnt = y_cnt + 1;
        const z_v_cnt = z_cnt + 1;
        // constructing the vertices
        let idx = 0;
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
        const layer_area = y_v_cnt * x_v_cnt;
        for (let i = 0; i < z_cnt; i++) {
            for (let j = 0; j < y_cnt; j++) {
                for (let k = 0; k < x_cnt; k++) {
                    const l0 = i * layer_area;
                    const l1 = (i + 1) * layer_area;
                    const r0 = j * x_v_cnt;
                    const r1 = (j + 1) * x_v_cnt;
                    const ln0 = k;
                    const ln1 = k + 1;
                    const idxs = [
                        l0 + r0 + ln0, l0 + r0 + ln1, l0 + r1 + ln1, l0 + r1 + ln0,
                        l1 + r0 + ln0, l1 + r0 + ln1, l1 + r1 + ln1, l1 + r1 + ln0
                    ];
                    // console.log(idxs);

                    let voxelVertices = [
                        this.vs[l0 + r0 + ln0],
                        this.vs[l0 + r0 + ln1],
                        this.vs[l0 + r1 + ln1],
                        this.vs[l0 + r1 + ln0],
                        this.vs[l1 + r0 + ln0],
                        this.vs[l1 + r0 + ln1],
                        this.vs[l1 + r1 + ln1],
                        this.vs[l1 + r1 + ln0]
                    ];

                    this.voxels.push(new CubeCell(voxelVertices, 1, this));
                }
            }
        }

        // populating the neighbourhoods
        const x_l_area = y_cnt * x_cnt;
        // top and bottom
        for (let i = 0; i < z_cnt-1; i++) {
            for (let j = 0; j < y_cnt; j++) {
                for (let k = 0; k < x_cnt; k++) {
                    this.voxels[i * x_l_area + j * x_cnt + k].top = this.voxels[(i + 1) * x_l_area + j * x_cnt + k];
                    this.voxels[(i + 1) * x_l_area + j * x_cnt + k].bottom = this.voxels[i * x_l_area + j * x_cnt + k];
                }
            }
        }
        
        // left and right
        for (let i = 0; i < z_cnt; i++) {
            for (let j = 0; j < y_cnt - 1; j++) {
                for (let k = 0; k < x_cnt; k++) {
                    this.voxels[i * x_l_area + j * x_cnt + k].back = this.voxels[i * x_l_area + (j + 1) * x_cnt + k];
                    this.voxels[i * x_l_area + (j + 1) * x_cnt + k].front = this.voxels[i * x_l_area + j * x_cnt + k];
                }
            }
        }
        
        // front and back
        for (let i = 0; i < z_cnt; i++) {
            for (let j = 0; j < y_cnt; j++) {
                for (let k = 0; k < x_cnt - 1; k++) {
                    this.voxels[i * x_l_area + j * x_cnt + k].right = this.voxels[i * x_l_area + j * x_cnt + k + 1];
                    this.voxels[i * x_l_area + j * x_cnt + k + 1].left = this.voxels[i * x_l_area + j * x_cnt + k];
                }
            }
        }

        // setting floor voxel
        for (let j = 0; j < y_cnt; j++) {
            for (let k = 0; k < x_cnt; k++) {
                this.voxels[j * x_cnt + k].bottom = floorGeometry;
            }
        }
    }

    get vertices(){
        return this.vs;
    }

    calculateFaces(){
        var fCount = 0;
        for (const v of this.voxels) {
            fCount += v.calculateNeighbours();
        }

        return fCount;
    }

    get activeFaces() {
        let faceArray = [];
        for (const v of this.voxels) {
            for (const f of v.activeFaces) {
                faceArray.push(f);
            }
        }
        
        return faceArray;
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

    transformationMatrices() {
        this.calculateFaces();

        let mArray = [];
        for (const voxel of this.voxels) {
            voxel.activeFacesMatrix(mArray);
        }

        return mArray;
    }

    constructVertexesList() {
        console.log("when calculating faces found "+this.calculateFaces()+" positives!");

        let vArray = [];
        for (const voxel of this.voxels) {
            voxel.facesVertexlist(vArray);
        }
        
        return vArray;
    }

    faceDotsGeometry(r = .5) {
        let fCount = this.calculateFaces();

        const geo = new THREE.DodecahedronGeometry(r, 2);
        const redColor = new THREE.Color().setHex('0x30a5c1');
        const material = new THREE.MeshPhongMaterial({
            color: redColor,
            opacity: 1.,
            transparent: false,
        });

        var meshGeo = new THREE.InstancedMesh(geo, material, fCount);
        const matrices = this.transformationMatrices();
        for (var i = 0 ; i < fCount; i++) {
            meshGeo.setMatrixAt(i, matrices[i]);
        }

        meshGeo.needsUpdate = true;

        return meshGeo;
    }
}

// console.log(floorGeometry);
// var vGrid = new VoxelGrid(10, 10, 10, 1.);
// console.log(vGrid.constructVertexFaceListString());
// console.log(vGrid.constructVertexeList());