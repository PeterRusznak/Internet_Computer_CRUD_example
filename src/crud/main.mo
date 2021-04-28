import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Trie "mo:base/Trie";

// Define the actor
actor Assistant {
    public type Id = Word32;
    private stable var next : Id = 0;
	private stable var customers : Trie.Trie<Id, Customer> = Trie.empty();
	   
    type Customer = {        
        name: Text;
        address: Text;
        email:Text;    
    };

    type CustomerWithId = {  
        id: Id;      
        name: Text;
        address: Text;
        email:Text;    
    };

    public func addCustomer (newCustomer: Customer) : async Id {
        let id = next;
        next +%= 1;
        customers := Trie.replace(
            customers,
            key(id),
            eq,
            ?newCustomer,
        ).0;
        
        return id;
    };

    public query func findCustomerById(id : Id) : async ?Customer {
        let result = Trie.find(customers, key(id), eq);
        return result;
    };

    //delete Customer if updatedCustomer is null. Otherwise update.  
    public func updateOrDelete(id : Id, updatedCustomer: ?Customer) : async Bool {
        let result = Trie.find(customers, key(id), eq);
        let exists = Option.isSome(result);
        if (exists) {
        customers := Trie.replace(
            customers,
            key(id),
            eq,
            updatedCustomer,
        ).0;
        };
        return exists;
    };

  

    public query func findAll () : async [CustomerWithId]  {
        let ret = Trie.toArray<Id, Customer, CustomerWithId>(customers, transform);
        return ret;
    };

    private func transform(id:Id, cust:Customer): CustomerWithId{
        let newCustomerWithId : CustomerWithId = {
            id = id; 
            name = cust.name;
            address =  cust.address;
            email = cust.email;
        };
        return newCustomerWithId;
    };
    
    private func eq(x : Id, y : Id) : Bool {
        return x == y;
    };

    private func key(x : Id) : Trie.Key<Id> {
        return { hash = x; key = x };
    };
};

