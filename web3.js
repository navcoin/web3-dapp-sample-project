class Web3SDK
{
  constructor(options)
  {
    options = options || {};
    this.network = options.network || "mainnet";
    this.log = options.log || false;
    this.Log("Web3 SDK loaded");
    window.addEventListener("message", (event) =>
    {
      if (event.data)
      {
        console.log(event);
        if (event.data.type=="extension")
        {
          window.dispatchEvent(new CustomEvent('extension_found',{"detail": event.data}));
        }
      }
    }, true);
    window.dispatchEvent(new CustomEvent('sdk_loaded',{
      "detail": {
        "network":this.network
      }
    }));
   }
  getNetwork()
  {
    return this.network;
  }
  async Connect()
  {
    console.log("Connect");
    this.RequestToWallet({method: "connect"});
  }
  async CreateNftCollection(param)
  {
    this.Log("CreateNftCollection");
    this.Log(param);
    this.RequestToWallet({method:"create_nft_collection",name:param.name,scheme:param.scheme,max_supply:param.max_supply});
  }
  async CreateNft(param)
  {
    this.Log("CreateNft");
    this.Log(param);
    this.RequestToWallet({method:"create_nft",scheme:param.scheme,nft_id:param.nft_id});
  }
  async ListNftCollections()
  {
    this.Log("ListNftCollections");
    this.RequestToWallet({method: "list_nft_collections"});
  }
  async RequestToWallet(param)
  {
    window.postMessage(param,"*");
  }
  async Log(o)
  {
    if (!this.log) return;
    console.log(o);
  }
}