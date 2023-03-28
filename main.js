

const btn = document.querySelector('button');
btn.onclick = () => {
    const index = Math.floor(Math.random()*2600);
    document.getElementById("letitre").innerHTML = 'Please wait... '
    document.getElementById("lartiste").innerHTML = ''
    document.getElementById("lemedium").innerHTML = ''
    getDesc(index)
        .then((a) => {
            document.getElementById("laphoto").src = a.imglink;
            document.getElementById("letitre").innerHTML = "Title: "+ a.title;
            document.getElementById("lartiste").innerHTML = "Artist/Origin: "+a.artiste;
            document.getElementById("lemedium").innerHTML = "Medium: "+a.medium;
        })
}

const getDesc = async (index) => {
        try {
            const d = {};
            d.index = index;
            const addr = 'https://api.artic.edu/api/v1/artworks/'+ index+'?fields=id,title,image_id';
            const result = await fetch(addr);
            const data = await result.json();
            const t = await fetch('https://api.artic.edu/api/v1/artworks/'+ index+'/manifest.json');
            const m = await t.json();
            d.imglink = data.config.iiif_url+'/' +data.data.image_id+'/full/843,/0/default.jpg';
            d.title = m.label;
            d.artiste = m.metadata[0].value;
            d.medium =  m.metadata[1].value;
            return d;
        }
        catch {
            const index = Math.floor(Math.random()*2600);
            return await getDesc(index-1);
        }
}



